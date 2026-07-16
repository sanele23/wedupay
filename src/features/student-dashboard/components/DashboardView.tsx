'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { useSessionStore } from '@/shared/store/useSessionStore';
import { useRequireRole } from '@/shared/hooks/useRequireRole';
import ProfileCard from './ProfileCard';
import BalanceCard from './BalanceCard';
import RatesInfoCard from './RatesInfoCard';
import PaymentForm from './PaymentForm';
import TransactionHistoryTable from './TransactionHistoryTable';

function downloadLedgerCsv(rows: { date: string; description: string; amount: number; paymentMethod: string; status: string }[]) {
  const csvContent = [
    ['Date', 'Description', 'Amount', 'Payment Method', 'Status'],
    ...rows.map((t) => [t.date, t.description, `$${t.amount.toFixed(2)}`, t.paymentMethod, t.status]),
  ]
    .map((e) => e.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'ledger_export_zwl.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function DashboardView() {
  const router = useRouter();
  const role = useRequireRole();
  const profile = useSessionStore((state) => state.profile);
  const allTransactions = useSessionStore((state) => state.transactions);
  const transactions = useMemo(
    () => allTransactions.filter((t) => t.studentId === profile.id),
    [allTransactions, profile.id]
  );
  const prefilledAmountUSD = useSessionStore((state) => state.prefilledAmountUSD);
  const authorizePayment = useSessionStore((state) => state.authorizePayment);

  const [payAmountUSD, setPayAmountUSD] = useState<string>('');
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);
  const amountInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (prefilledAmountUSD && prefilledAmountUSD > 0) {
      setPayAmountUSD(prefilledAmountUSD.toFixed(2));
    }
  }, [prefilledAmountUSD]);

  if (role === 'none') {
    return null;
  }

  const handleSettleFullBalance = () => {
    setPayAmountUSD(profile.balanceDue.toFixed(2));
    amountInputRef.current?.focus();
    amountInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleAuthorizePayment = (amountPaid: number, method: string) => {
    authorizePayment(amountPaid, method);
    router.push('/success');
  };

  const handleExportClick = () => {
    setExportSuccess(true);
    downloadLedgerCsv(transactions);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  return (
    <div className="pt-28 md:pt-36 max-w-7xl mx-auto px-6 md:px-10 py-10 relative">
      {exportSuccess && (
        <div className="fixed top-24 right-6 bg-black text-white p-4 border border-brand-gold font-mono text-xs z-50 flex items-center gap-2 animate-fade-in">
          <Check size={16} className="text-brand-gold" />
          <span>Ledger ledger_export_zwl.csv downloaded successfully!</span>
        </div>
      )}

      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-border">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-black tracking-tight">
            Student Dashboard
          </h1>
          <p className="text-gray-500 font-sans text-sm mt-1">
            Manage your BYU-Pathway tuition payments for the Zimbabwe Node.
          </p>
        </div>
        <div className="bg-[#f4f2fd] border border-brand-border px-5 py-3 relative">
          <span className="font-mono text-[9px] uppercase text-gray-500 tracking-wider font-bold block">
            Current Node
          </span>
          <span className="font-display text-lg font-bold text-black">{profile.node}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 space-y-8">
          <ProfileCard profile={profile} />
          <BalanceCard profile={profile} onSettleFullBalance={handleSettleFullBalance} />
          <RatesInfoCard />
        </div>

        <div className="lg:col-span-8" id="payment-portal">
          <PaymentForm
            studentId={profile.id}
            amount={payAmountUSD}
            onAmountChange={setPayAmountUSD}
            amountInputRef={amountInputRef}
            onAuthorize={handleAuthorizePayment}
          />
        </div>
      </div>

      <TransactionHistoryTable transactions={transactions} onExportClick={handleExportClick} />
    </div>
  );
}
