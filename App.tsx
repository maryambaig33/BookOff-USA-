import React, { useState } from 'react';
import { AppView } from './types';
import StoreList from './components/StoreList';
import AIChat from './components/AIChat';
import { Map, BookOpen, Sparkles, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.BROWSE);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation */}
      <nav className="bg-[#003399] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView(AppView.BROWSE)}>
              <div className="bg-[#FFCC00] p-1.5 rounded-md text-[#003399]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="flex flex-col leading-none">
                <h1 className="text-xl font-extrabold tracking-tight">
                  BOOKOFF
                </h1>
                <span className="text-[10px] font-bold text-[#FFCC00] tracking-[0.2em] uppercase">USA</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => setCurrentView(AppView.BROWSE)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  currentView === AppView.BROWSE 
                    ? 'bg-white text-[#003399]' 
                    : 'text-blue-100 hover:bg-[#0044cc] hover:text-white'
                }`}
              >
                <Map className="w-4 h-4" />
                Store Locator
              </button>
              <button
                onClick={() => setCurrentView(AppView.AI_FINDER)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                  currentView === AppView.AI_FINDER
                    ? 'bg-[#FFCC00] text-[#003399] border-[#FFCC00]' 
                    : 'bg-transparent border-blue-400 text-blue-100 hover:border-[#FFCC00] hover:text-[#FFCC00]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                AI Scout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-blue-200 hover:text-white hover:bg-[#0044cc] focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#002266] border-t border-[#0044cc]">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => { setCurrentView(AppView.BROWSE); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-bold ${
                  currentView === AppView.BROWSE ? 'bg-[#FFCC00] text-[#003399]' : 'text-blue-100 hover:bg-[#003399]'
                }`}
              >
                Store Locator
              </button>
              <button
                onClick={() => { setCurrentView(AppView.AI_FINDER); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-bold ${
                  currentView === AppView.AI_FINDER ? 'bg-[#FFCC00] text-[#003399]' : 'text-blue-100 hover:bg-[#003399]'
                }`}
              >
                AI Store Scout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-[#003399] text-white pb-32 pt-10 px-4 relative overflow-hidden transition-all duration-500">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFCC00] rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left md:flex md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              {currentView === AppView.BROWSE ? (
                <>
                  Find Your Treasure at <span className="text-[#FFCC00]">BOOKOFF</span>
                </>
              ) : (
                <>
                  Ask Our <span className="text-[#FFCC00]">AI Scout</span> Anything
                </>
              )}
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl leading-relaxed">
              {currentView === AppView.BROWSE 
                ? 'Discover pre-loved books, anime, games, and electronics at a store near you. Sustainable shopping starts here.' 
                : 'Looking for a specific location, open hours, or just want to know where to sell your old games? Let our AI help you out.'}
            </p>
          </div>
          {currentView === AppView.BROWSE && (
            <div className="hidden md:block pb-2">
               <button onClick={() => setCurrentView(AppView.AI_FINDER)} className="group flex items-center gap-2 text-[#FFCC00] font-bold hover:text-white transition-colors">
                 Can't find it? Ask AI <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-12 relative z-20 pb-12">
        {currentView === AppView.BROWSE ? (
          <StoreList />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
            <div className="lg:col-span-2">
              <AIChat />
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg">
                <h3 className="font-bold text-[#003399] text-xl flex items-center gap-2 mb-4">
                  <BookOpen className="w-6 h-6 text-[#FFCC00]" />
                  Why Shop With Us?
                </h3>
                <ul className="space-y-4 text-sm text-slate-700">
                  <li className="flex gap-3 items-start">
                    <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5"><Sparkles className="w-3 h-3" /></div>
                    <span><strong>Eco-Friendly:</strong> Give books and media a second life and reduce waste.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="bg-orange-100 p-1 rounded-full text-orange-600 mt-0.5"><Sparkles className="w-3 h-3" /></div>
                    <span><strong>Cash for Goods:</strong> We buy your gently used items on the spot.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="bg-blue-100 p-1 rounded-full text-blue-600 mt-0.5"><Sparkles className="w-3 h-3" /></div>
                    <span><strong>Unique Finds:</strong> Discover rare Japanese imports, retro games, and more.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-[#FFCC00] p-6 rounded-xl shadow-md text-[#003399]">
                <h3 className="font-extrabold text-lg mb-2">We Buy Your Stuff!</h3>
                <p className="text-[#003399]/80 text-sm mb-4 font-medium">
                  Cleaning out your shelves? Bring your used books, DVDs, and games to any counter.
                </p>
                <button className="w-full bg-[#003399] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#002266] transition-colors shadow-lg shadow-blue-900/20">
                  View Buying Guidelines
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#002266] text-blue-200 py-12 mt-auto border-t border-[#003399]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
             <h4 className="text-[#FFCC00] font-extrabold text-xl mb-4">BOOKOFF USA</h4>
             <p className="text-sm max-w-sm leading-relaxed">
               BookOff is the world's leading used bookstore chain. We are dedicated to providing a wide selection of quality used books, music, movies, and games at affordable prices.
             </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Buying Policy</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-[#FFCC00] transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-[#003399] text-center text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} BOOKOFF USA INC. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-white">Privacy</span>
            <span className="cursor-pointer hover:text-white">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;