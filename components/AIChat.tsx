import React, { useState, useEffect, useRef } from 'react';
import { Send, MapPin, Bot, User, Sparkles, AlertCircle, ExternalLink } from 'lucide-react';
import { findStoresWithAI } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm the BookOff Location Scout. I can find the nearest stores to you using live Google Maps data. Try asking 'Where is the nearest BookOff?' or 'Is there a store in Manhattan?'"
    }
  ]);
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
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: query
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
       {/* Ambient Background */}
       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-orange-50/50 pointer-events-none z-0" />
      
      <div className="bg-white/80 backdrop-blur-md p-4 border-b border-slate-100 flex items-center gap-3 z-10 sticky top-0">
        <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-blue-500/20">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-slate-800">AI Location Scout</h2>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Powered by Gemini & Google Maps
          </p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 z-10 scroll-smooth"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center shrink-0
              ${msg.role === 'user' ? 'bg-slate-200' : 'bg-orange-100'}
            `}>
              {msg.role === 'user' ? <User className="w-5 h-5 text-slate-600" /> : <MapPin className="w-5 h-5 text-orange-600" />}
            </div>
            
            <div className={`max-w-[80%] space-y-2`}>
              <div className={`
                p-4 rounded-2xl shadow-sm text-sm leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}
              `}>
                {msg.text}
              </div>

              {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2 animate-fadeIn">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-500" />
                    Verified Locations
                  </p>
                  {msg.groundingLinks.map((link, idx) => (
                    <a 
                      key={idx} 
                      href={link.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all group"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-800 truncate group-hover:text-blue-700">{link.title}</div>
                        <div className="text-xs text-slate-400">{link.source}</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0 animate-bounce">
              <Bot className="w-5 h-5 text-orange-600" />
            </div>
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-0"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100 z-10">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={location ? "Found you! Ask 'Where is the nearest store?'" : "Ask about a location (e.g., 'BookOff Hawaii')"}
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400 text-slate-800"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        {!location && (
          <div className="mt-2 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-100">
            <AlertCircle className="w-3 h-3" />
            <span>Enable location access for better results.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChat;