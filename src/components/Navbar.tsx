import React, { useState } from 'react';
import { Menu, X, Landmark, CreditCard, LogOut } from 'lucide-react';

interface NavbarProps {
  currentPage: 'landing' | 'auth' | 'dashboard' | 'merchant' | 'success';
  onNavigate: (page: 'landing' | 'auth' | 'dashboard' | 'merchant' | 'success') => void;
  onLogout?: () => void;
}

export default function Navbar({ currentPage, onNavigate, onLogout }: NavbarProps) {
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

          {/* Navigation for Student Dashboard */}
          {currentPage === 'dashboard' && (
            <div className="hidden md:flex gap-8 items-center h-20">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="text-black font-bold border-b-2 border-black h-20 px-2 font-display text-xs uppercase tracking-widest"
              >
                Student Hub
              </button>
              <a 
                href="#transactions"
                className="text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-brand-gold transition-colors duration-200"
              >
                Ledger History
              </a>
            </div>
          )}

          {/* Navigation for Merchant Workspace */}
          {currentPage === 'merchant' && (
            <div className="hidden md:flex gap-8 items-center h-20">
              <button 
                onClick={() => onNavigate('merchant')}
                className="text-black font-bold border-b-2 border-black h-20 px-2 font-display text-xs uppercase tracking-widest"
              >
                Admin Panel
              </button>
              <span className="px-3 py-1 bg-yellow-50 text-yellow-800 border border-yellow-200 text-[10px] font-mono uppercase font-bold">
                Harare HQ Node
              </span>
            </div>
          )}
        </div>

        {/* Right Side: CTA / Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {currentPage === 'landing' || currentPage === 'auth' ? (
            <>
              <button 
                onClick={() => onNavigate('auth')}
                className="px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-widest border border-brand-border hover:border-black transition-all bg-transparent text-black"
              >
                Portal Login
              </button>
              <button 
                onClick={() => onNavigate('auth')}
                className="px-6 py-3 bg-black text-white font-sans text-xs font-bold uppercase tracking-widest active:scale-95 hover:bg-brand-gold hover:text-black transition-all"
              >
                Launch Workspace
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mr-2 px-3 py-1.5 border border-brand-border bg-gray-50 text-xs font-mono text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                {currentPage === 'merchant' ? 'Admin Node' : 'Student Node'} Active
              </div>
              <button 
                onClick={() => {
                  if (onLogout) {
                    onLogout();
                  } else {
                    onNavigate('landing');
                  }
                }}
                className="px-6 py-3 bg-black text-white font-sans text-xs font-bold uppercase tracking-widest active:scale-95 hover:bg-brand-gold hover:text-black transition-all flex items-center gap-2"
              >
                <LogOut size={14} />
                Logout
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
          {currentPage === 'landing' || currentPage === 'auth' ? (
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
                    onNavigate('auth');
                  }}
                  className="w-full text-center py-2.5 border border-brand-border font-sans text-xs font-bold uppercase tracking-widest hover:border-black transition-all"
                >
                  Portal Login
                </button>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('auth');
                  }}
                  className="w-full text-center py-3 bg-black text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-black transition-all"
                >
                  Launch Workspace
                </button>
              </div>
            </>
          ) : (
            <>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(currentPage);
                }}
                className="block text-left w-full text-black font-bold text-xs uppercase tracking-widest"
              >
                {currentPage === 'merchant' ? 'Admin Panel' : 'Student Hub'}
              </button>
              <div className="pt-2">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onLogout) {
                      onLogout();
                    } else {
                      onNavigate('landing');
                    }
                  }}
                  className="w-full text-center py-3 bg-black text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-black transition-all flex items-center justify-center gap-2"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
