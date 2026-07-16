import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Success from './components/Success';
import { INITIAL_STUDENT_PROFILE, INITIAL_TRANSACTIONS } from './data';
import { StudentProfile, Transaction } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'success'>('landing');
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [prefilledAmountUSD, setPrefilledAmountUSD] = useState<number | undefined>(undefined);
  
  // Payment outcomes tracker
  const [lastPaymentAmount, setLastPaymentAmount] = useState<number>(120.00);
  const [lastPaymentMethod, setLastPaymentMethod] = useState<string>('EcoCash');

  // Handle navigation
  const handleNavigate = (page: 'landing' | 'dashboard' | 'success') => {
    // Clear prefilled if navigating away from dashboard
    if (page !== 'dashboard') {
      setPrefilledAmountUSD(undefined);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch dashboard with optional prefilled value from calculator
  const handleLaunchApp = (amountUSD?: number) => {
    if (amountUSD !== undefined) {
      setPrefilledAmountUSD(amountUSD);
    }
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle successful transaction authorization
  const handleAuthorizePayment = (amountPaid: number, method: string) => {
    setLastPaymentAmount(amountPaid);
    setLastPaymentMethod(method);

    // 1. Create realistic new transaction
    const newTxn: Transaction = {
      id: `TXN-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      description: 'BYU-Pathway Tuition - Term Settlement',
      amount: amountPaid,
      status: 'Sent to BYU',
      paymentMethod: method,
      hash: '0x82f3c7e4a1b2d3e4f5a1',
      batchId: `ZW-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
    };

    // 2. Prepend to current transaction list
    setTransactions([newTxn, ...transactions]);

    // 3. Deduct paid amount from current balance due (cap at 0)
    setProfile(prev => ({
      ...prev,
      balanceDue: Math.max(0, prev.balanceDue - amountPaid)
    }));

    // 4. Reset prefilled and navigate to success receipt
    setPrefilledAmountUSD(undefined);
    setCurrentPage('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Export ledger file helper
  const handleExportLedger = () => {
    // Generate simple csv file representation
    const csvContent = [
      ['Date', 'Description', 'Amount', 'Payment Method', 'Status'],
      ...transactions.map(t => [t.date, t.description, `$${t.amount.toFixed(2)}`, t.paymentMethod, t.status])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ledger_export_zwl.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen flex flex-col ${currentPage === 'success' ? 'bg-[#0B0B0C]' : 'bg-white'}`}>
      
      {/* Top Navigation Bar (Except on success page for focal dark layout) */}
      {currentPage !== 'success' && (
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      )}

      {/* Main View Content */}
      <div className="flex-grow">
        {currentPage === 'landing' && (
          <Landing onLaunchApp={handleLaunchApp} />
        )}
        
        {currentPage === 'dashboard' && (
          <Dashboard 
            profile={profile}
            transactions={transactions}
            prefilledAmountUSD={prefilledAmountUSD}
            onAuthorizePayment={handleAuthorizePayment}
            onExportLedger={handleExportLedger}
          />
        )}

        {currentPage === 'success' && (
          <Success 
            amountPaid={lastPaymentAmount}
            paymentMethod={lastPaymentMethod}
            onBackToDashboard={() => handleNavigate('dashboard')}
          />
        )}
      </div>

      {/* Global standard footer (except on success, which has its own dedicated dark footer) */}
      {currentPage !== 'success' && (
        <footer className="border-t border-brand-border bg-gray-50 mt-auto">
          <div className="w-full py-12 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-6 text-gray-500">
            <div className="flex flex-col gap-2 items-center md:items-start">
              <span className="font-display text-lg font-black text-black">WeduPay</span>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                © 2024 WeduPay Fintech. All Rights Reserved.
              </p>
            </div>
            <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest">
              <a href="#" className="hover:text-brand-gold transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-brand-gold transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-brand-gold transition-colors duration-200">Contact Support</a>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}
