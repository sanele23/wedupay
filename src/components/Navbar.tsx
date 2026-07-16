import React, { useState } from 'react';
import { Menu, X, Landmark, CreditCard, LogOut } from 'lucide-react';

interface NavbarProps {
  currentPage: 'landing' | 'dashboard' | 'success';
  onNavigate: (page: 'landing' | 'dashboard' | 'success') => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-brand-border fixed top-0 left-0 w-full z-50 transition-all duration-200">
      <div className="flex justify-between items-center w-full px-6 md:px-10 max-w-7xl mx-auto h-20">
        {/* Left Side: Brand & Secondary Links */}
        <div className="flex items-center gap-10">
          <span 
            className="font-display text-2xl md:text-3xl font-black tracking-tighter text-black cursor-pointer select-none"
            onClick={() => onNavigate('landing')}
          >
            WeduPay
          </span>
          
          {/* Navigation for Landing */}
          {currentPage === 'landing' && (
            <div className="hidden md:flex gap-8">
              <a 
                href="#how-it-works" 
                className="text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-brand-gold transition-colors duration-200"
              >
                How it Works
              </a>
              <a 
                href="#rates" 
                className="text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-brand-gold transition-colors duration-200"
              >
                Pathway Rates
              </a>
            </div>
          )}

          {/* Navigation for Dashboard */}
          {currentPage === 'dashboard' && (
            <div className="hidden md:flex gap-8 items-center h-20">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="text-black font-bold border-b-2 border-black h-20 px-2 font-display text-xs uppercase tracking-widest"
              >
                Dashboard
              </button>
              <a 
                href="#transactions"
                className="text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-brand-gold transition-colors duration-200"
              >
                Transactions
              </a>
              <a 
                href="#rates-panel"
                className="text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-brand-gold transition-colors duration-200"
              >
                Pathway Rates
              </a>
            </div>
          )}
        </div>

        {/* Right Side: CTA / Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {currentPage === 'landing' ? (
            <>
              <button 
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-widest border border-brand-border hover:border-black transition-all bg-transparent text-black"
              >
                BYU-Pathway Rates
              </button>
              <button 
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 bg-black text-white font-sans text-xs font-bold uppercase tracking-widest active:scale-95 hover:bg-brand-gold hover:text-black transition-all"
              >
                Launch App
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mr-2 px-3 py-1.5 border border-brand-border bg-gray-50 text-xs font-mono text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                ZW Node Active
              </div>
              <button 
                onClick={() => onNavigate('landing')}
                className="px-6 py-3 bg-black text-white font-sans text-xs font-bold uppercase tracking-widest active:scale-95 hover:bg-brand-gold hover:text-black transition-all flex items-center gap-2"
              >
                <LogOut size={14} />
                Exit App
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-black hover:text-brand-gold focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-white px-6 py-4 space-y-4">
          {currentPage === 'landing' ? (
            <>
              <a 
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 font-bold text-xs uppercase tracking-widest hover:text-brand-gold"
              >
                How it Works
              </a>
              <a 
                href="#rates"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 font-bold text-xs uppercase tracking-widest hover:text-brand-gold"
              >
                Pathway Rates
              </a>
              <div className="pt-2 flex flex-col gap-2">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('dashboard');
                  }}
                  className="w-full text-center py-2.5 border border-brand-border font-sans text-xs font-bold uppercase tracking-widest hover:border-black transition-all"
                >
                  BYU-Pathway Rates
                </button>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('dashboard');
                  }}
                  className="w-full text-center py-3 bg-black text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-black transition-all"
                >
                  Launch App
                </button>
              </div>
            </>
          ) : (
            <>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('dashboard');
                }}
                className="block text-left w-full text-black font-bold text-xs uppercase tracking-widest"
              >
                Dashboard
              </button>
              <a 
                href="#transactions"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 font-bold text-xs uppercase tracking-widest hover:text-brand-gold"
              >
                Transactions
              </a>
              <a 
                href="#rates-panel"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 font-bold text-xs uppercase tracking-widest hover:text-brand-gold"
              >
                Pathway Rates
              </a>
              <div className="pt-2">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('landing');
                  }}
                  className="w-full text-center py-3 bg-black text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-black transition-all flex items-center justify-center gap-2"
                >
                  <LogOut size={14} />
                  Exit App
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
