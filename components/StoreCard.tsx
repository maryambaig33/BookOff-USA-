import React from 'react';
import { StoreLocation } from '../types';
import { MapPin, Clock, Phone, Navigation, Star } from 'lucide-react';

interface StoreCardProps {
  store: StoreLocation;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden bg-slate-200">
        <img 
          src={store.imageUrl} 
          alt={store.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#003399] shadow-sm flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {store.city}, {store.state}
        </div>
        <div className="absolute bottom-3 left-3 text-white">
          <h3 className="text-xl font-bold shadow-black drop-shadow-md">{store.name}</h3>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="space-y-4 text-sm text-slate-600 mb-6 flex-1">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
               <MapPin className="w-4 h-4 text-orange-500" />
            </div>
            <div className="pt-1.5">
               <p className="font-medium text-slate-900">{store.address}</p>
               <p>{store.city}, {store.state} {store.zip}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#003399]" />
            </div>
            <span className="pt-0.5">{store.hours}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-green-600" />
            </div>
            <span className="pt-0.5 font-medium">{store.phone}</span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Features</p>
          <div className="flex flex-wrap gap-2">
            {store.features.slice(0, 4).map((feature, idx) => (
              <span key={idx} className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200">
                {feature}
              </span>
            ))}
            {store.features.length > 4 && (
              <span className="bg-slate-50 text-slate-400 text-xs font-semibold px-2 py-1 rounded-md">
                +{store.features.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex gap-3">
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${store.address}, ${store.city}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#003399] hover:bg-[#002266] text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-colors shadow-lg shadow-blue-900/10"
          >
            <Navigation className="w-4 h-4" />
            Directions
          </a>
          <button 
            className="p-2.5 text-slate-400 hover:text-[#FFCC00] hover:bg-[#FFCC00]/10 border border-slate-200 hover:border-[#FFCC00] rounded-lg transition-all" 
            aria-label="Save store"
          >
            <Star className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;