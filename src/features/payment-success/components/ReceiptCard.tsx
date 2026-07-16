import { Check, CheckCircle, Clock, Copy, ShieldCheck } from 'lucide-react';

interface ReceiptCardProps {
  amountPaid: number;
  txnHash: string;
  batchId: string;
  copied: boolean;
  onCopyHash: () => void;
}

export default function ReceiptCard({ amountPaid, txnHash, batchId, copied, onCopyHash }: ReceiptCardProps) {
  return (
    <div className="bg-[#1c1b1c] border border-gray-800 relative success-glow">
      <div className="scanline"></div>

      <div className="p-8 flex flex-col items-center text-center border-b border-gray-800/60">
        <div className="mb-6">
          <div className="w-20 h-20 border-2 border-brand-gold flex items-center justify-center bg-brand-black/55 select-none">
            <CheckCircle size={44} className="text-brand-gold" />
          </div>
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-black text-white tracking-tight">
          Payment Confirmed
        </h1>
        <p className="font-sans text-xs text-gray-400 mt-2 leading-relaxed">
          Funds successfully secured for BYU-Pathway tuition.
        </p>
      </div>

      <div className="p-6 space-y-4 bg-brand-black/30">
        <div className="flex justify-between items-center py-2.5 border-b border-gray-800/40">
          <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">
            Transaction Hash
          </span>
          <button
            onClick={onCopyHash}
            className="font-mono text-[10px] text-white bg-gray-900 border border-gray-800 px-2.5 py-1 hover:text-brand-gold hover:border-brand-gold transition-all flex items-center gap-1.5"
            title="Click to copy hash"
          >
            {copied ? (
              <>
                <Check size={10} className="text-brand-gold" />
                <span className="text-brand-gold text-[9px] font-bold">COPIED</span>
              </>
            ) : (
              <>
                <Copy size={10} />
                <span>{txnHash}</span>
              </>
            )}
          </button>
        </div>

        <div className="flex justify-between items-center py-2.5 border-b border-gray-800/40">
          <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">Amount Paid</span>
          <span className="font-display text-xl font-extrabold text-brand-gold">
            ${amountPaid.toFixed(2)} USD
          </span>
        </div>

        <div className="flex justify-between items-center py-2.5 border-b border-gray-800/40">
          <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">
            Pathway Batch ID
          </span>
          <span className="font-mono text-xs font-bold text-white">{batchId}</span>
        </div>

        <div className="flex justify-between items-center py-2.5">
          <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">Est. Arrival</span>
          <div className="flex items-center gap-1.5 text-brand-gold">
            <Clock size={12} />
            <span className="font-mono text-[11px] font-bold">24 Hours</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="p-4 bg-brand-gold/5 border border-brand-gold/20 flex gap-3 items-start">
          <ShieldCheck size={18} className="text-brand-gold mt-0.5 shrink-0" />
          <div>
            <p className="font-mono text-[9px] text-brand-gold uppercase tracking-wider font-bold mb-0.5">
              Security Protocol
            </p>
            <p className="font-sans text-[11px] text-gray-400 leading-normal">
              This transaction is verified via the WeduPay Zimbabwe Node and BYU-Pathway
              International disbursement ledger.
            </p>
          </div>
        </div>
      </div>

      <div className="h-2 w-full receipt-edge opacity-20"></div>
    </div>
  );
}
