import React, { useState, useRef, useEffect } from 'react';
import { Smartphone, Landmark, Shield, ChevronRight, Download, User, Calendar, Check, ArrowRight, Loader2, Info } from 'lucide-react';
import { PaymentMethod, Transaction, StudentProfile } from '../types';
import { EXCHANGE_RATE_ZWL_USD } from '../data';

interface DashboardProps {
  profile: StudentProfile;
  transactions: Transaction[];
  prefilledAmountUSD?: number;
  onAuthorizePayment: (amountPaid: number, method: string) => void;
  onExportLedger: () => void;
}

export default function Dashboard({
  profile,
  transactions,
  prefilledAmountUSD,
  onAuthorizePayment,
  onExportLedger,
}: DashboardProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('ecocash');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [payAmountUSD, setPayAmountUSD] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingLog, setProcessingLog] = useState<string>('');
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const amountInputRef = useRef<HTMLInputElement>(null);

  // Apply prefilled amount from landing page if available
  useEffect(() => {
    if (prefilledAmountUSD && prefilledAmountUSD > 0) {
      setPayAmountUSD(prefilledAmountUSD.toFixed(2));
    }
  }, [prefilledAmountUSD]);

  // Handle auto-settle click
  const handleSettleFullBalance = () => {
    setPayAmountUSD(profile.balanceDue.toFixed(2));
    if (amountInputRef.current) {
      amountInputRef.current.focus();
      amountInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(payAmountUSD);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid tuition amount in USD.');
      return;
    }

    if (!phoneNumber) {
      alert('Please enter your phone number linked to the selected payment method.');
      return;
    }

    // Trigger simulation sequence
    setIsProcessing(true);
    setProcessingLog('Initiating secure gateway...');
    
    setTimeout(() => {
      setProcessingLog('Syncing with Harare, Zimbabwe gateway node...');
      setTimeout(() => {
        setProcessingLog('Verifying BYU-Pathway Student ID (29-4822-1)...');
        setTimeout(() => {
          setProcessingLog('Confirming ledger reserves & routing payments...');
          setTimeout(() => {
            setIsProcessing(false);
            onAuthorizePayment(amountNum, selectedMethod === 'ecocash' ? 'EcoCash' : selectedMethod === 'mobile_money' ? 'Mobile Money' : 'Bank Transfer');
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  const handleExportClick = () => {
    setExportSuccess(true);
    onExportLedger();
    setTimeout(() => setExportSuccess(false), 3000);
  };

  return (
    <div className="pt-28 md:pt-36 max-w-7xl mx-auto px-6 md:px-10 py-10 relative">
      {/* Export notification alert */}
      {exportSuccess && (
        <div className="fixed top-24 right-6 bg-black text-white p-4 border border-brand-gold font-mono text-xs z-50 flex items-center gap-2 animate-fade-in">
          <Check size={16} className="text-brand-gold" />
          <span>Ledger ledger_export_zwl.csv downloaded successfully!</span>
        </div>
      )}

      {/* Dashboard Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-border">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-black tracking-tight">Student Dashboard</h1>
          <p className="text-gray-500 font-sans text-sm mt-1">Manage your BYU-Pathway tuition payments for the Zimbabwe Node.</p>
        </div>
        <div className="bg-[#f4f2fd] border border-brand-border px-5 py-3 relative">
          <span className="font-mono text-[9px] uppercase text-gray-500 tracking-wider font-bold block">Current Node</span>
          <span className="font-display text-lg font-bold text-black">{profile.node}</span>
        </div>
      </header>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Profile & Balance card */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Profile Card */}
          <div className="border border-brand-border bg-white p-6 relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 border border-brand-border overflow-hidden select-none">
                <img 
                  className="w-full h-full object-cover" 
                  alt={profile.name}
                  src={profile.avatarUrl} 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-black leading-tight">{profile.name}</h2>
                <p className="font-mono text-[10px] uppercase text-gray-400 tracking-widest mt-1">ID: {profile.id}</p>
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono uppercase text-gray-400 font-bold">Program</span>
                <span className="font-sans font-bold text-black">{profile.program}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono uppercase text-gray-400 font-bold">Status</span>
                <span className="font-sans text-green-700 bg-green-50 px-2 py-0.5 font-bold border border-green-200">
                  {profile.status}
                </span>
              </div>
            </div>
          </div>

          {/* Balance/Ledger Card */}
          <div className="border-2 border-brand-gold bg-white p-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-brand-gold opacity-30">
              <Landmark size={24} />
            </div>
            <h3 className="font-mono text-[10px] uppercase text-gray-400 tracking-wider font-bold mb-1">
              Current Semester Balance Due
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl font-extrabold text-black">${profile.balanceDue.toFixed(2)}</span>
              <span className="font-mono text-[11px] uppercase text-gray-400 tracking-wider font-bold">USD</span>
            </div>
            <p className="font-sans text-xs text-gray-500 mt-3 leading-relaxed">
              Next Installment due by 15th of the month.
            </p>
            <button 
              onClick={handleSettleFullBalance}
              className="w-full mt-6 bg-black text-white py-3.5 font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-gold hover:text-black transition-all active:scale-95"
            >
              Settle Full Balance
            </button>
          </div>

          {/* Quick Rates Info Widget */}
          <div className="border border-brand-border p-4 bg-gray-50 space-y-2">
            <div className="flex items-center gap-2 text-black font-bold text-xs font-mono uppercase">
              <Info size={14} className="text-brand-gold" />
              <span>Current Exchange Rates</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Calculations are secured using the fixed daily Zimbabwe Node ledger: <strong>1 USD = {EXCHANGE_RATE_ZWL_USD} ZWL</strong>.
            </p>
          </div>

        </div>

        {/* Right Column: Payment Portal Form */}
        <div className="lg:col-span-8" id="payment-portal">
          <div className="border border-brand-border bg-white p-6 md:p-8 relative">
            
            {/* Custom Boxed Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-mono text-xs font-black">
                1
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-black">Payment Portal</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Select Method */}
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-black block mb-4">
                  Step 1: Select Payment Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Mobile Money */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('mobile_money')}
                    className={`flex flex-col items-center justify-center border p-6 hover:border-black transition-all group ${
                      selectedMethod === 'mobile_money'
                        ? 'border-black bg-gray-50'
                        : 'border-brand-border'
                    }`}
                  >
                    <Smartphone size={24} className={`mb-2 transition-colors ${
                      selectedMethod === 'mobile_money' ? 'text-black' : 'text-gray-400'
                    }`} />
                    <span className="font-mono text-xs uppercase tracking-widest font-bold text-center">
                      Mobile Money
                    </span>
                  </button>

                  {/* EcoCash */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('ecocash')}
                    className={`flex flex-col items-center justify-center border p-6 hover:border-black transition-all group relative ${
                      selectedMethod === 'ecocash'
                        ? 'border-black bg-gray-50'
                        : 'border-brand-border'
                    }`}
                  >
                    <Landmark size={24} className={`mb-2 transition-colors ${
                      selectedMethod === 'ecocash' ? 'text-black' : 'text-gray-400'
                    }`} />
                    <span className="font-mono text-xs uppercase tracking-widest font-bold text-center">
                      EcoCash
                    </span>
                    <span className="absolute -top-2.5 px-2 py-0.5 bg-brand-gold text-black text-[8px] font-mono font-bold tracking-widest uppercase">
                      Most Popular
                    </span>
                  </button>

                  {/* Bank Transfer */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('bank_transfer')}
                    className={`flex flex-col items-center justify-center border p-6 hover:border-black transition-all group ${
                      selectedMethod === 'bank_transfer'
                        ? 'border-black bg-gray-50'
                        : 'border-brand-border'
                    }`}
                  >
                    <Landmark size={24} className={`mb-2 transition-colors ${
                      selectedMethod === 'bank_transfer' ? 'text-black' : 'text-gray-400'
                    }`} />
                    <span className="font-mono text-xs uppercase tracking-widest font-bold text-center">
                      Bank Transfer
                    </span>
                  </button>

                </div>
              </div>

              {/* Step 2: Verification Details */}
              <div className="space-y-6 pt-4 border-t border-gray-100">
                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-black block mb-4">
                  Step 2: Student Verification
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Student ID (Readonly) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-black font-bold">
                      BYU ID Number
                    </label>
                    <input 
                      type="text"
                      readOnly
                      className="w-full border border-brand-border bg-gray-50 p-4 font-mono text-xs text-gray-500 focus:outline-none"
                      value={profile.id}
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-black font-bold">
                      Phone Number (Linked to Payment)
                    </label>
                    <input 
                      type="tel"
                      required
                      placeholder="+263 77 123 4567"
                      className="w-full border border-brand-border p-4 font-mono text-xs text-black focus:border-black focus:outline-none focus:ring-0"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  {/* Amount to Pay */}
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-black font-bold">
                      Amount to Pay (USD)
                    </label>
                    <div className="flex items-center border border-brand-border p-4 bg-white focus-within:border-black">
                      <span className="font-mono text-xs text-gray-400 mr-2">$</span>
                      <input 
                        ref={amountInputRef}
                        type="number"
                        required
                        min="5"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full bg-transparent border-none p-0 text-xl font-bold font-mono text-black focus:outline-none focus:ring-0"
                        value={payAmountUSD}
                        onChange={(e) => setPayAmountUSD(e.target.value)}
                      />
                      <span className="font-mono text-xs text-gray-400">USD</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {isProcessing ? (
                  <div className="w-full bg-black text-white p-6 flex flex-col items-center justify-center gap-3 border-sharp-thick font-mono text-xs">
                    <Loader2 size={24} className="text-brand-gold animate-spin" />
                    <p className="text-brand-gold uppercase tracking-widest font-black animate-pulse">
                      Processing Secure Transfer...
                    </p>
                    <div className="text-[10px] text-gray-400 text-center font-mono select-none px-4 max-w-md border-t border-gray-800 pt-2 mt-2">
                      {processingLog}
                    </div>
                  </div>
                ) : (
                  <button 
                    type="submit"
                    className="w-full bg-black text-white py-4 font-mono text-xs uppercase tracking-[0.2em] font-black hover:bg-brand-gold hover:text-black transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    Authorize Transaction
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>

      </div>

      {/* Bottom Section: Transaction History */}
      <section className="mt-16" id="transactions">
        <div className="border border-brand-border bg-white overflow-hidden">
          
          <div className="px-6 py-4 border-b border-brand-border flex justify-between items-center bg-white">
            <h3 className="font-display text-lg font-bold text-black">Transaction History</h3>
            <button 
              onClick={handleExportClick}
              className="font-mono text-[10px] uppercase text-gray-400 tracking-widest font-bold hover:text-black transition-colors"
            >
              Export Ledger
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-brand-border">
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Date</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Description</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Amount</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((txn, index) => (
                  <tr key={txn.id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-gray-500">{txn.date}</td>
                    <td className="px-6 py-4 text-xs font-sans font-bold text-black">{txn.description}</td>
                    <td className="px-6 py-4 text-xs font-mono font-bold text-black">
                      ${txn.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {txn.status === 'Sent to BYU' && (
                        <span className="px-2 py-1 bg-[#ffe088]/30 text-[#745c00] border border-[#ffe088] font-mono text-[9px] uppercase font-bold tracking-wider">
                          Sent to BYU
                        </span>
                      )}
                      {txn.status === 'Processed' && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 border border-gray-200 font-mono text-[9px] uppercase font-bold tracking-wider">
                          Processed
                        </span>
                      )}
                      {txn.status === 'Pending Clearance' && (
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[9px] uppercase font-bold tracking-wider animate-pulse">
                          Pending Clearance
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>
    </div>
  );
}
