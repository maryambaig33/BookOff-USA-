import React, { useState, useEffect, useRef } from 'react';
import { Send, MapPin, Bot, User, Sparkles, AlertCircle, ExternalLink, Compass } from 'lucide-react';
import { findStoresWithAI } from '../services/geminiService';
import { ChatMessage } from '../types';

const SUGGESTED_QUERIES = [
  "Where is the nearest BookOff?",
  "Are there any stores in California?",
  "Does the New York store buy anime figures?",
  "Which stores are open right now?",
];

const AIChat: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number} | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.log('Geolocation denied or error:', error)
      );
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || query;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const response = await findStoresWithAI(userMsg.text, location);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I'm having trouble searching right now. Please try again or use the Browse list."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
      {/* Header */}
      <div className="bg-[#003399] p-4 flex items-center gap-3 z-10 sticky top-0 shadow-md">
        <div className="bg-white/10 p-2 rounded-lg text-[#FFCC00]">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-white text-lg leading-tight">BookOff AI Scout</h2>
          <p className="text-xs text-blue-200 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Online & Ready to Help
          </p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 z-10 scroll-smooth bg-slate-50"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
               <Compass className="w-12 h-12 text-[#003399]" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">How can I help you?</h3>
            <p className="text-sm text-slate-500 max-w-xs">
              I can find stores, check hours, and give you directions using the latest Google Maps data.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-white
                ${msg.role === 'user' ? 'bg-slate-200' : 'bg-[#FFCC00]'}
              `}>
                {msg.role === 'user' ? <User className="w-6 h-6 text-slate-600" /> : <Bot className="w-6 h-6 text-[#003399]" />}
              </div>
              
              <div className={`max-w-[85%] space-y-2`}>
                <div className={`
                  p-4 rounded-2xl shadow-sm text-sm leading-relaxed
                  ${msg.role === 'user' 
                    ? 'bg-[#003399] text-white rounded-tr-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'}
                `}>
                  {msg.text}
                </div>

                {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2 animate-fadeIn shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#FFCC00]" />
                      Sources
                    </p>
                    {msg.groundingLinks.map((link, idx) => (
                      <a 
                        key={idx} 
                        href={link.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-300 hover:shadow-sm transition-all group"
                      >
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-blue-300 transition-colors">
                          <MapPin className="w-4 h-4 text-[#003399]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-800 truncate group-hover:text-[#003399]">{link.title}</div>
                          <div className="text-xs text-slate-500">{link.source}</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-[#003399]" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFCC00] flex items-center justify-center shrink-0 border border-white">
              <Bot className="w-6 h-6 text-[#003399]" />
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2 h-12">
              <span className="w-2 h-2 bg-[#003399] rounded-full animate-bounce delay-0"></span>
              <span className="w-2 h-2 bg-[#003399] rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-[#003399] rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Chips */}
      {messages.length === 0 && !isLoading && (
        <div className="absolute bottom-20 left-0 w-full px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {SUGGESTED_QUERIES.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-4 py-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full text-xs font-semibold text-[#003399] hover:bg-[#FFCC00] hover:text-[#003399] hover:border-[#FFCC00] transition-colors shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 z-20">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={location ? "Ask about a store location..." : "Ask something (e.g., 'BookOff Hawaii')"}
            className="w-full pl-5 pr-14 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003399] focus:bg-white transition-all placeholder:text-slate-400 text-slate-800 font-medium"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-[#003399] text-white rounded-lg hover:bg-[#002266] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        {!location && (
          <div className="mt-3 flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-100">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>Enable location access for precise "near me" results.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChat;