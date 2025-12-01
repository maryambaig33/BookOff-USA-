import React from 'react';
import { StoreLocation } from '../types';
import { MapPin, Clock, Phone, Navigation, Star } from 'lucide-react';

interface StoreCardProps {
  store: StoreLocation;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={store.imageUrl} 
          alt={store.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-blue-600 shadow-sm">
          {store.city}, {store.state}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{store.name}</h3>
        
        <div className="space-y-3 text-sm text-slate-600 mb-4 flex-1">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
            <span>{store.address}, {store.city}, {store.state} {store.zip}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500 shrink-0" />
            <span>{store.hours}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-green-500 shrink-0" />
            <span>{store.phone}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {store.features.slice(0, 3).map((feature, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md">
              {feature}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2">
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${store.address}, ${store.city}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
          >
            <Navigation className="w-4 h-4" />
            Get Directions
          </a>
          <button className="p-2 text-slate-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors" aria-label="Save store">
            <Star className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;