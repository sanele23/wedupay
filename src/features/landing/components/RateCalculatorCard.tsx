'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';
import { EXCHANGE_RATE_ZWL_USD } from '@/lib/mock-data';
import { useSessionStore } from '@/shared/store/useSessionStore';

export default function RateCalculatorCard() {
  const [payAmount, setPayAmount] = useState<string>('50000');
  const [receiveAmount, setReceiveAmount] = useState<string>('150.00');
  const [isZwlToUsd, setIsZwlToUsd] = useState<boolean>(true);
  const [rotate, setRotate] = useState<boolean>(false);

  const router = useRouter();
  const role = useSessionStore((state) => state.role);
  const setPrefilledAmountUSD = useSessionStore((state) => state.setPrefilledAmountUSD);

  // Recalculate whenever payAmount or direction changes
  useEffect(() => {
    const val = parseFloat(payAmount) || 0;
    if (isZwlToUsd) {
      const converted = (val / EXCHANGE_RATE_ZWL_USD).toFixed(2);
      setReceiveAmount(converted);
    } else {
      const converted = (val * EXCHANGE_RATE_ZWL_USD).toFixed(2);
      setReceiveAmount(converted);
    }
  }, [payAmount, isZwlToUsd]);

  const handleFlip = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 500);

    const tempPay = payAmount;
    setPayAmount(receiveAmount);
    setReceiveAmount(tempPay);
    setIsZwlToUsd(!isZwlToUsd);
  };

  const handleContinue = () => {
    const usdAmount = isZwlToUsd ? parseFloat(receiveAmount) : parseFloat(payAmount);
    if (usdAmount > 0) {
      setPrefilledAmountUSD(usdAmount);
    }

    if (role === 'none') {
      router.push('/auth');
    } else if (role === 'merchant') {
      router.push('/merchant');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="lg:col-span-5" id="rates">
      <div className="border-2 border-black p-6 flex flex-col gap-6 bg-white relative transition-all duration-300">
        <div className="absolute -top-3.5 -right-2 px-3 py-1 bg-black text-white font-mono text-[10px] uppercase tracking-wider font-bold">
          Zero Hidden Fees
        </div>

        {/* Pay Input */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            {isZwlToUsd ? 'You Pay (ZWL Amount)' : 'You Pay (USD Amount)'}
          </label>
          <div className="flex items-center border border-brand-border p-4 bg-white">
            <input
              type="number"
              className="w-full bg-transparent border-none p-0 text-2xl font-bold font-display focus:outline-none"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              placeholder="0.00"
            />
            <span className="font-display text-lg font-black ml-2 text-black">
              {isZwlToUsd ? 'ZWL' : 'USD'}
            </span>
          </div>
        </div>

        {/* Currency Flip Button */}
        <div className="flex justify-center -my-9 z-10">
          <button
            onClick={handleFlip}
            className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
            title="Flip Currency Conversion"
          >
            <RefreshCw
              size={20}
              className={`text-black transition-transform duration-500 ${rotate ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Receive Output */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            {isZwlToUsd ? 'Tuition Credit (Guaranteed USD)' : 'Tuition Cost (ZWL Equivalent)'}
          </label>
          <div className="flex items-center border border-brand-border p-4 bg-gray-50">
            <input
              type="text"
              readOnly
              className="w-full bg-transparent border-none p-0 text-2xl font-bold font-display text-brand-gold focus:outline-none"
              value={isZwlToUsd ? `$${receiveAmount}` : receiveAmount}
            />
            <span className="font-display text-lg font-black ml-2 text-brand-gold">
              {isZwlToUsd ? 'USD' : 'ZWL'}
            </span>
          </div>
        </div>

        {/* Rate & Fee breakdown */}
        <div className="flex flex-col gap-3 border-t border-brand-border pt-4 mt-2">
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest font-bold">
            <span className="text-gray-500">Exchange Rate</span>
            <span className="text-black">1 USD = {EXCHANGE_RATE_ZWL_USD} ZWL</span>
          </div>
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest font-bold">
            <span className="text-gray-500">Processing Fee</span>
            <span className="text-brand-gold">$0.00 (Zero Fee)</span>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-4 bg-black text-white font-mono text-xs uppercase tracking-widest font-black hover:bg-brand-gold hover:text-black transition-colors duration-300"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}
