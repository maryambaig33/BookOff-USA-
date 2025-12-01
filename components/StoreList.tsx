import React, { useState } from 'react';
import { STORES, STATES } from '../constants';
import StoreCard from './StoreCard';
import { Filter, Search } from 'lucide-react';

const StoreList: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStores = STORES.filter(store => {
    const matchesState = selectedState === 'All' || store.state === selectedState;
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          store.zip.includes(searchTerm);
    return matchesState && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Controls */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by city, name, or zip..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <Filter className="w-5 h-5 text-slate-400 shrink-0" />
          <button 
            onClick={() => setSelectedState('All')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedState === 'All' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            All States
          </button>
          {STATES.map(state => (
            <button
              key={state}
              onClick={() => setSelectedState(state)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedState === state ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredStores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map(store => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700">No stores found</h3>
          <p className="text-slate-500">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
};

export default StoreList;