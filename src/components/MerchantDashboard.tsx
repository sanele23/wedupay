import React, { useState } from 'react';
import { Landmark, Check, Search, ShieldCheck, Download, Loader2, AlertCircle, RefreshCw, LogOut } from 'lucide-react';
import { Transaction, StudentProfile } from '../types';
import { EXCHANGE_RATE_ZWL_USD } from '../data';

interface MerchantDashboardProps {
  transactions: Transaction[];
  onApproveTransaction: (txnId: string) => void;
  onLogout: () => void;
}

export default function MerchantDashboard({
  transactions,
  onApproveTransaction,
  onLogout,
}: MerchantDashboardProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [clearingTxnId, setClearingTxnId] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Stats calculation
  const totalCollectedUSD = transactions
    .filter(t => t.status !== 'Pending Clearance')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingCount = transactions.filter(t => t.status === 'Pending Clearance').length;
  const totalVolumeUSD = transactions.reduce((sum, t) => sum + t.amount, 0);

  const pendingPayments = transactions.filter(t => t.status === 'Pending Clearance');
  const clearedPayments = transactions.filter(t => t.status !== 'Pending Clearance');

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(t => {
    const searchLower = searchTerm.toLowerCase();
    const matchesId = t.id.toLowerCase().includes(searchLower);
    const matchesStudentName = t.studentName ? t.studentName.toLowerCase().includes(searchLower) : false;
    const matchesStudentId = t.studentId ? t.studentId.toLowerCase().includes(searchLower) : false;
    const matchesMethod = t.paymentMethod.toLowerCase().includes(searchLower);
    return matchesId || matchesStudentName || matchesStudentId || matchesMethod;
  });

  const handleApprove = (txnId: string, studentName: string) => {
    setClearingTxnId(txnId);
    
    // Simulate API approval delay
    setTimeout(() => {
      onApproveTransaction(txnId);
      setClearingTxnId(null);
      setSuccessToast(`Successfully approved and cleared tuition for ${studentName || 'Student'}!`);
      setTimeout(() => setSuccessToast(null), 4000);
    }, 1500);
  };

  return (
    <div className="pt-28 md:pt-36 max-w-7xl mx-auto px-6 md:px-10 py-10 relative">
      
      {/* Toast Alert */}
      {successToast && (
        <div className="fixed top-24 right-6 bg-black text-white p-4 border border-brand-gold font-mono text-xs z-50 flex items-center gap-2 animate-fade-in shadow-xl">
          <Check size={16} className="text-brand-gold" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header section with Stats */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping"></span>
            <span className="font-mono text-[9px] uppercase text-yellow-600 font-bold tracking-widest">
              Harare Node Administrator Control
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-black tracking-tight mt-1">
            Merchant Workspace
          </h1>
          <p className="text-gray-500 font-sans text-sm mt-1">Consolidated BYU-Pathway International disbursement and tuition settlement ledger.</p>
        </div>
        <button 
          onClick={onLogout}
          className="bg-black hover:bg-brand-gold hover:text-black text-white px-5 py-3 font-mono text-xs uppercase tracking-widest font-bold transition-colors duration-200 flex items-center gap-2"
        >
          <LogOut size={14} />
          Lock Console
        </button>
      </header>

      {/* Stats Board */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="border border-brand-border bg-white p-5">
          <span className="font-mono text-[9px] uppercase text-gray-400 tracking-wider font-bold block">Consolidated Settle Pool</span>
          <span className="font-display text-2xl lg:text-3xl font-black text-black block mt-2">
            ${totalCollectedUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] font-mono text-green-700 font-bold block mt-1">USD Clearance Confirmed</span>
        </div>

        <div className="border border-[#D4AF37] bg-white p-5">
          <span className="font-mono text-[9px] uppercase text-yellow-600 tracking-wider font-bold block">Clearance Queue</span>
          <span className="font-display text-2xl lg:text-3xl font-black text-black block mt-2">
            {pendingCount}
          </span>
          <span className="text-[10px] font-mono text-yellow-600 font-bold block mt-1">Payments Awaiting Verification</span>
        </div>

        <div className="border border-brand-border bg-white p-5">
          <span className="font-mono text-[9px] uppercase text-gray-400 tracking-wider font-bold block">Gross Volume Routed</span>
          <span className="font-display text-2xl lg:text-3xl font-black text-black block mt-2">
            ${totalVolumeUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] font-mono text-gray-400 font-bold block mt-1">ZW-Node Cumulative Ledger</span>
        </div>

        <div className="border border-brand-border bg-white p-5">
          <span className="font-mono text-[9px] uppercase text-gray-400 tracking-wider font-bold block">Conversion Guard</span>
          <span className="font-display text-lg lg:text-xl font-bold text-black block mt-3">
            1 USD = {EXCHANGE_RATE_ZWL_USD} ZWL
          </span>
          <span className="text-[10px] font-mono text-gray-500 font-bold block mt-1">Daily Zimbabwe Node rate</span>
        </div>
      </div>

      {/* Section 1: Clearance Queue */}
      <section className="mb-12">
        <div className="border border-brand-border bg-white">
          <div className="px-6 py-4 border-b border-brand-border bg-gray-50/50">
            <h3 className="font-display text-base font-black text-black uppercase tracking-tight flex items-center gap-2">
              <RefreshCw size={16} className="text-brand-gold animate-spin" />
              Real-time Tuition Settlement Clearance Queue
            </h3>
          </div>

          {pendingPayments.length === 0 ? (
            <div className="p-12 text-center text-gray-400 flex flex-col items-center justify-center gap-3">
              <ShieldCheck size={36} className="text-gray-300" />
              <div>
                <p className="font-mono text-xs uppercase tracking-widest font-bold text-black">Ledger Fully Cleared</p>
                <p className="font-sans text-xs text-gray-500 mt-1">All current student tuition payments are verified and synchronized.</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-brand-border">
              {pendingPayments.map(t => (
                <div key={t.id} className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-gray-50/50 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-yellow-50 border border-yellow-200 text-yellow-700 font-mono text-[9px] uppercase font-bold tracking-wider">
                        Awaiting Verification
                      </span>
                      <span className="font-mono text-xs text-gray-400">ID: {t.id}</span>
                    </div>
                    <div className="font-sans">
                      <span className="font-black text-black text-base">{t.studentName || 'Tinashe Moyo'}</span>
                      <span className="text-gray-400 text-xs font-mono ml-2">(BYU ID: {t.studentId || '29-4822-1'})</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 text-xs text-gray-500">
                      <span>Method: <strong className="text-black font-sans">{t.paymentMethod}</strong></span>
                      <span>Batch ID: <strong className="text-black font-mono">{t.batchId}</strong></span>
                      <span>Hash: <strong className="text-black font-mono">{t.hash.substr(0, 8)}...</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                    <div className="text-right">
                      <span className="font-mono text-[9px] text-gray-400 uppercase font-bold tracking-wider block">Payment Total</span>
                      <span className="font-display text-xl font-extrabold text-brand-gold">${t.amount.toFixed(2)} USD</span>
                    </div>

                    {clearingTxnId === t.id ? (
                      <button
                        disabled
                        className="bg-black text-brand-gold px-6 py-3 border border-black font-mono text-[10px] uppercase tracking-wider font-bold flex items-center gap-2"
                      >
                        <Loader2 size={12} className="animate-spin" />
                        Routing Funds...
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprove(t.id, t.studentName || 'Student')}
                        className="bg-black text-white hover:bg-brand-gold hover:text-black px-6 py-3 font-mono text-[10px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 focus:outline-none"
                      >
                        Approve Clearance
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Consolidated Ledger search and lookup */}
      <section>
        <div className="border border-brand-border bg-white overflow-hidden">
          
          <div className="px-6 py-4 border-b border-brand-border bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="font-display text-base font-extrabold text-black uppercase tracking-tight">Consolidated Ledger lookup</h3>
            
            {/* Search Input */}
            <div className="flex items-center border border-brand-border p-2 bg-white w-full sm:w-72 focus-within:border-black">
              <Search size={14} className="text-gray-400 mr-2" />
              <input 
                type="text"
                placeholder="Search Student, ID, Hash..."
                className="w-full bg-transparent border-none p-0 text-xs focus:outline-none focus:ring-0 font-sans"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-brand-border">
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Transaction</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Student</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Date</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Amount</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Channel</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-xs font-mono text-gray-400 uppercase">
                      No matching transaction entries found in Zimbabwe Node.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map(t => (
                    <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-mono text-xs text-black font-bold">{t.id}</div>
                        <div className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                          Batch: {t.batchId}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-sans text-xs font-bold text-black">
                          {t.studentName || 'Tinashe Moyo'}
                        </div>
                        <div className="font-mono text-[9px] text-gray-400">
                          ID: {t.studentId || '29-4822-1'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-gray-500">{t.date}</td>
                      <td className="px-6 py-4 text-xs font-mono font-bold text-black">
                        ${t.amount.toFixed(2)} USD
                      </td>
                      <td className="px-6 py-4 text-xs font-sans text-gray-600">{t.paymentMethod}</td>
                      <td className="px-6 py-4">
                        {t.status === 'Sent to BYU' && (
                          <span className="px-2 py-1 bg-[#ffe088]/30 text-[#745c00] border border-[#ffe088] font-mono text-[9px] uppercase font-bold tracking-wider">
                            Sent to BYU
                          </span>
                        )}
                        {t.status === 'Processed' && (
                          <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 font-mono text-[9px] uppercase font-bold tracking-wider">
                            Processed
                          </span>
                        )}
                        {t.status === 'Pending Clearance' && (
                          <span className="px-2 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 font-mono text-[9px] uppercase font-bold tracking-wider animate-pulse">
                            Pending Clearance
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </section>

    </div>
  );
}
