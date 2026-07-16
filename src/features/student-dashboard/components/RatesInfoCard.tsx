import { Info } from 'lucide-react';
import { EXCHANGE_RATE_ZWL_USD } from '@/lib/mock-data';

export default function RatesInfoCard() {
  return (
    <div className="border border-brand-border p-4 bg-gray-50 space-y-2">
      <div className="flex items-center gap-2 text-black font-bold text-xs font-mono uppercase">
        <Info size={14} className="text-brand-gold" />
        <span>Current Exchange Rates</span>
      </div>
      <p className="text-[11px] text-gray-500 leading-relaxed">
        Calculations are secured using the fixed daily Zimbabwe Node ledger:{' '}
        <strong>1 USD = {EXCHANGE_RATE_ZWL_USD} ZWL</strong>.
      </p>
    </div>
  );
}
