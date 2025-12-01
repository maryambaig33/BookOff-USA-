import React, { useState, useMemo } from 'react';
import { STORES, STATES } from '../constants';
import StoreCard from './StoreCard';
import { Filter, Search, X, Tag } from 'lucide-react';

const StoreList: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedFeature, setSelectedFeature] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all unique features
  const allFeatures = useMemo(() => {
    const features = new Set<string>();
    STORES.forEach(store => store.features.forEach(f => features.add(f)));
    return Array.from(features).sort();
  }, []);

  const filteredStores = STORES.filter(store => {
    const matchesState = selectedState === 'All' || store.state === selectedState;
    const matchesFeature = selectedFeature === 'All' || store.features.includes(selectedFeature);
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          store.zip.includes(searchTerm);
    return matchesState && matchesFeature && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedState('All');
    setSelectedFeature('All');
    setSearchTerm('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Controls Container - Floating Effect */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-slate-200 -mt-8 relative z-30 mx-0 md:mx-2">
        <div className="flex flex-col gap-6">
          
          {/* Top Row: Search and Clear */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                placeholder="Search city, zip, or store name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399] focus:bg-white transition-all text-slate-700 font-medium"
              />
            </div>
            {(selectedState !== 'All' || selectedFeature !== 'All' || searchTerm) && (
              <button 
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium whitespace-nowrap"
              >
                <X className="w-4 h-4" /> Clear Filters
              </button>
            )}
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* State Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter by State
              </label>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSelectedState('All')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    selectedState === 'All' 
                      ? 'bg-[#003399] text-white border-[#003399]' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-[#003399]'
                  }`}
                >
                  All States
                </button>
                {STATES.map(state => (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      selectedState === state 
                        ? 'bg-[#003399] text-white border-[#003399]' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#003399]'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                <Tag className="w-3 h-3" /> Filter by Feature
              </label>
              <div className="flex flex-wrap gap-2">
                 <button 
                  onClick={() => setSelectedFeature('All')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    selectedFeature === 'All' 
                      ? 'bg-[#FFCC00] text-[#003399] border-[#FFCC00]' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-[#FFCC00]'
                  }`}
                >
                  Any
                </button>
                {allFeatures.slice(0, 8).map(feature => (
                  <button
                    key={feature}
                    onClick={() => setSelectedFeature(feature)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      selectedFeature === feature 
                        ? 'bg-[#FFCC00] text-[#003399] border-[#FFCC00]' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#FFCC00]'
                    }`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 px-1">
          Showing {filteredStores.length} Location{filteredStores.length !== 1 ? 's' : ''}
        </h3>
        
        {filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border-2 border-slate-100 border-dashed">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">No stores found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your filters or search for something else.</p>
            <button 
              onClick={clearFilters}
              className="mt-6 px-6 py-2 bg-[#003399] text-white rounded-lg font-bold text-sm hover:bg-blue-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreList;