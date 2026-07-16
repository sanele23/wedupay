import { EXCHANGE_RATE_ZWL_USD } from '@/lib/mock-data';

interface StatsBoardProps {
  totalCollectedUSD: number;
  pendingCount: number;
  totalVolumeUSD: number;
}

export default function StatsBoard({ totalCollectedUSD, pendingCount, totalVolumeUSD }: StatsBoardProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      <div className="border border-brand-border bg-white p-5">
        <span className="font-mono text-[9px] uppercase text-gray-400 tracking-wider font-bold block">
          Consolidated Settle Pool
        </span>
        <span className="font-display text-2xl lg:text-3xl font-black text-black block mt-2">
          ${totalCollectedUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span className="text-[10px] font-mono text-green-700 font-bold block mt-1">USD Clearance Confirmed</span>
      </div>

      <div className="border border-[#D4AF37] bg-white p-5">
        <span className="font-mono text-[9px] uppercase text-yellow-600 tracking-wider font-bold block">
          Clearance Queue
        </span>
        <span className="font-display text-2xl lg:text-3xl font-black text-black block mt-2">{pendingCount}</span>
        <span className="text-[10px] font-mono text-yellow-600 font-bold block mt-1">
          Payments Awaiting Verification
        </span>
      </div>

      <div className="border border-brand-border bg-white p-5">
        <span className="font-mono text-[9px] uppercase text-gray-400 tracking-wider font-bold block">
          Gross Volume Routed
        </span>
        <span className="font-display text-2xl lg:text-3xl font-black text-black block mt-2">
          ${totalVolumeUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span className="text-[10px] font-mono text-gray-400 font-bold block mt-1">ZW-Node Cumulative Ledger</span>
      </div>

      <div className="border border-brand-border bg-white p-5">
        <span className="font-mono text-[9px] uppercase text-gray-400 tracking-wider font-bold block">
          Conversion Guard
        </span>
        <span className="font-display text-lg lg:text-xl font-bold text-black block mt-3">
          1 USD = {EXCHANGE_RATE_ZWL_USD} ZWL
        </span>
        <span className="text-[10px] font-mono text-gray-500 font-bold block mt-1">Daily Zimbabwe Node rate</span>
      </div>
    </div>
  );
}
