import { Loader2, RefreshCw, ShieldCheck } from 'lucide-react';
import { Transaction } from '@/shared/types';

interface ClearanceQueueProps {
  pendingPayments: Transaction[];
  clearingTxnId: string | null;
  onApprove: (txnId: string, studentName: string) => void;
}

export default function ClearanceQueue({ pendingPayments, clearingTxnId, onApprove }: ClearanceQueueProps) {
  return (
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
              <p className="font-sans text-xs text-gray-500 mt-1">
                All current student tuition payments are verified and synchronized.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-brand-border">
            {pendingPayments.map((t) => (
              <div
                key={t.id}
                className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-gray-50/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-yellow-50 border border-yellow-200 text-yellow-700 font-mono text-[9px] uppercase font-bold tracking-wider">
                      Awaiting Verification
                    </span>
                    <span className="font-mono text-xs text-gray-400">ID: {t.id}</span>
                  </div>
                  <div className="font-sans">
                    <span className="font-black text-black text-base">{t.studentName || 'Tinashe Moyo'}</span>
                    <span className="text-gray-400 text-xs font-mono ml-2">
                      (BYU ID: {t.studentId || '29-4822-1'})
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 text-xs text-gray-500">
                    <span>
                      Method: <strong className="text-black font-sans">{t.paymentMethod}</strong>
                    </span>
                    <span>
                      Batch ID: <strong className="text-black font-mono">{t.batchId}</strong>
                    </span>
                    <span>
                      Hash: <strong className="text-black font-mono">{t.hash.substr(0, 8)}...</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                  <div className="text-right">
                    <span className="font-mono text-[9px] text-gray-400 uppercase font-bold tracking-wider block">
                      Payment Total
                    </span>
                    <span className="font-display text-xl font-extrabold text-brand-gold">
                      ${t.amount.toFixed(2)} USD
                    </span>
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
                      onClick={() => onApprove(t.id, t.studentName || 'Student')}
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
  );
}
