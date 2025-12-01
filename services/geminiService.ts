import { GoogleGenAI } from "@google/genai";
import { ChatMessage, GroundingLink } from "../types";

const createClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is available.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const findStoresWithAI = async (
  query: string, 
  userLocation?: { lat: number; lng: number }
): Promise<ChatMessage> => {
  const ai = createClient();
  const model = "gemini-2.5-flash";

  // Configuration for Google Maps grounding
  const config: any = {
    tools: [{ googleMaps: {} }],
  };

  // If user location is available, prioritize nearby search
  if (userLocation) {
    config.toolConfig = {
      retrievalConfig: {
        latLng: {
          latitude: userLocation.lat,
          longitude: userLocation.lng
        }
      }
    };
  }

  // Instruct Gemini to focus on BookOff specifically or similar stores if not found
  const prompt = `
    User Query: "${query}"
    
    Context: You are the "BookOff Finder AI". Your goal is to help users find BookOff locations in the USA.
    If the user asks for a store, use Google Maps to find the nearest BookOff location.
    Provide the address, hours, and a friendly reason why they should visit.
    If no specific BookOff is nearby, suggest the closest relevant alternatives or general advice.
    Be concise and helpful.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config,
    });

    const text = response.text || "I couldn't find that information right now.";
    
    // Extract grounding chunks (Maps URLs)
    const groundingLinks: GroundingLink[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          groundingLinks.push({
            title: chunk.web.title,
            uri: chunk.web.uri,
            source: 'Web'
          });
        }
        if (chunk.maps) {
           // Maps chunks might be formatted differently, extracting URI is key
           // Usually chunk.maps.placeAnswerSources contains details
           groundingLinks.push({
             title: chunk.maps.title || "View on Google Maps",
             uri: chunk.maps.placeAnswerSources?.[0]?.uri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(text.slice(0, 20))}`,
             source: 'Google Maps'
           });
        }
      });
    }

    return {
      id: Date.now().toString(),
      role: 'model',
      text,
      groundingLinks
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      id: Date.now().toString(),
      role: 'model',
      text: "I'm having trouble connecting to my map services right now. Please check the 'Browse Locations' tab for a full list of stores.",
    };
  }
};