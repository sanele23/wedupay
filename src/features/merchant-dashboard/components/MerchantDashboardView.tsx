'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, LogOut } from 'lucide-react';
import { useSessionStore } from '@/shared/store/useSessionStore';
import { useRequireRole } from '@/shared/hooks/useRequireRole';
import StatsBoard from './StatsBoard';
import ClearanceQueue from './ClearanceQueue';
import LedgerSearchTable from './LedgerSearchTable';

export default function MerchantDashboardView() {
  const router = useRouter();
  const role = useRequireRole();
  const transactions = useSessionStore((state) => state.transactions);
  const approveTransaction = useSessionStore((state) => state.approveTransaction);
  const logout = useSessionStore((state) => state.logout);

  const [clearingTxnId, setClearingTxnId] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (role === 'none') {
    return null;
  }

  const totalCollectedUSD = transactions
    .filter((t) => t.status !== 'Pending Clearance')
    .reduce((sum, t) => sum + t.amount, 0);
  const pendingCount = transactions.filter((t) => t.status === 'Pending Clearance').length;
  const totalVolumeUSD = transactions.reduce((sum, t) => sum + t.amount, 0);
  const pendingPayments = transactions.filter((t) => t.status === 'Pending Clearance');

  const handleApprove = (txnId: string, studentName: string) => {
    setClearingTxnId(txnId);

    setTimeout(() => {
      approveTransaction(txnId);
      setClearingTxnId(null);
      setSuccessToast(`Successfully approved and cleared tuition for ${studentName || 'Student'}!`);
      setTimeout(() => setSuccessToast(null), 4000);
    }, 1500);
  };

  const handleLockConsole = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="pt-28 md:pt-36 max-w-7xl mx-auto px-6 md:px-10 py-10 relative">
      {successToast && (
        <div className="fixed top-24 right-6 bg-black text-white p-4 border border-brand-gold font-mono text-xs z-50 flex items-center gap-2 animate-fade-in shadow-xl">
          <Check size={16} className="text-brand-gold" />
          <span>{successToast}</span>
        </div>
      )}

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
          <p className="text-gray-500 font-sans text-sm mt-1">
            Consolidated BYU-Pathway International disbursement and tuition settlement ledger.
          </p>
        </div>
        <button
          onClick={handleLockConsole}
          className="bg-black hover:bg-brand-gold hover:text-black text-white px-5 py-3 font-mono text-xs uppercase tracking-widest font-bold transition-colors duration-200 flex items-center gap-2"
        >
          <LogOut size={14} />
          Lock Console
        </button>
      </header>

      <StatsBoard
        totalCollectedUSD={totalCollectedUSD}
        pendingCount={pendingCount}
        totalVolumeUSD={totalVolumeUSD}
      />

      <ClearanceQueue
        pendingPayments={pendingPayments}
        clearingTxnId={clearingTxnId}
        onApprove={handleApprove}
      />

      <LedgerSearchTable transactions={transactions} />
    </div>
  );
}
