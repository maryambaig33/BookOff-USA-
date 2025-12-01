import React, { useState } from 'react';
import { AppView } from './types';
import StoreList from './components/StoreList';
import AIChat from './components/AIChat';
import { Map, BookOpen, Sparkles, ShoppingBag, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.BROWSE);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-600 to-orange-500 p-2 rounded-lg text-white">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                  BOOKOFF
                </h1>
                <span className="text-xs font-semibold text-orange-500 tracking-widest uppercase">USA</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setCurrentView(AppView.BROWSE)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === AppView.BROWSE 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Map className="w-4 h-4" />
                Browse Locations
              </button>
              <button
                onClick={() => setCurrentView(AppView.AI_FINDER)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all group ${
                  currentView === AppView.AI_FINDER
                    ? 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border border-orange-200' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${currentView === AppView.AI_FINDER ? 'text-orange-500' : 'text-slate-400 group-hover:text-yellow-500 transition-colors'}`} />
                AI Store Scout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => { setCurrentView(AppView.BROWSE); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentView === AppView.BROWSE ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Browse Locations
              </button>
              <button
                onClick={() => { setCurrentView(AppView.AI_FINDER); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentView === AppView.AI_FINDER ? 'bg-orange-50 text-orange-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                AI Store Scout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header Section */}
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl tracking-tight">
            {currentView === AppView.BROWSE ? 'Find Your Local Store' : 'Ask Our Store Scout'}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-500">
            {currentView === AppView.BROWSE 
              ? 'Browse our locations across the US to find books, games, and more.' 
              : 'Not sure where to go? Let our AI assistant find the perfect BookOff location for you using real-time maps.'}
          </p>
        </div>

        {/* View Switcher */}
        {currentView === AppView.BROWSE ? (
          <StoreList />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AIChat />
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  Why BookOff?
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    Eco-friendly reuse of books & media
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    Sell your old items for cash
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    Rare finds and Japanese imports
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl shadow-md text-white">
                <h3 className="font-bold text-lg mb-2">Sell to Us!</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Bring your gently used books, games, and consoles. We buy them on the spot.
                </p>
                <button className="w-full bg-white text-blue-700 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors">
                  View Buying Guidelines
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
             <h4 className="text-white font-bold text-lg mb-4">BOOKOFF USA</h4>
             <p className="text-sm">Recycle, Reuse, Reimagine. The best place for used books, movies, and games.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Connect</h4>
            <div className="flex space-x-4">
              {/* Social Placeholders */}
              <div className="w-8 h-8 bg-slate-700 rounded-full hover:bg-blue-500 transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 bg-slate-700 rounded-full hover:bg-pink-500 transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 bg-slate-700 rounded-full hover:bg-sky-500 transition-colors cursor-pointer"></div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-xs">
          &copy; {new Date().getFullYear()} BOOKOFF USA INC. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;