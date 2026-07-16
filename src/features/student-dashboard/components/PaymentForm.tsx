'use client';

import { RefObject, useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { PaymentMethod } from '@/shared/types';
import PaymentMethodSelector from './PaymentMethodSelector';

const METHOD_LABELS: Record<PaymentMethod, string> = {
  mobile_money: 'Mobile Money',
  ecocash: 'EcoCash',
  bank_transfer: 'Bank Transfer',
};

interface PaymentFormProps {
  studentId: string;
  amount: string;
  onAmountChange: (value: string) => void;
  amountInputRef: RefObject<HTMLInputElement | null>;
  onAuthorize: (amountPaid: number, method: string) => void;
}

export default function PaymentForm({
  studentId,
  amount,
  onAmountChange,
  amountInputRef,
  onAuthorize,
}: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('ecocash');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingLog, setProcessingLog] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid tuition amount in USD.');
      return;
    }

    if (!phoneNumber) {
      alert('Please enter your phone number linked to the selected payment method.');
      return;
    }

    setIsProcessing(true);
    setProcessingLog('Initiating secure gateway...');

    setTimeout(() => {
      setProcessingLog('Syncing with Harare, Zimbabwe gateway node...');
      setTimeout(() => {
        setProcessingLog(`Verifying BYU-Pathway Student ID (${studentId})...`);
        setTimeout(() => {
          setProcessingLog('Confirming ledger reserves & routing payments...');
          setTimeout(() => {
            setIsProcessing(false);
            onAuthorize(amountNum, METHOD_LABELS[selectedMethod]);
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  return (
    <div className="border border-brand-border bg-white p-6 md:p-8 relative">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-mono text-xs font-black">
          1
        </div>
        <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-black">
          Payment Portal
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <PaymentMethodSelector selectedMethod={selectedMethod} onSelect={setSelectedMethod} />

        <div className="space-y-6 pt-4 border-t border-gray-100">
          <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-black block mb-4">
            Step 2: Student Verification
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-black font-bold">
                BYU ID Number
              </label>
              <input
                type="text"
                readOnly
                className="w-full border border-brand-border bg-gray-50 p-4 font-mono text-xs text-gray-500 focus:outline-none"
                value={studentId}
              />
            </div>

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
                  value={amount}
                  onChange={(e) => onAmountChange(e.target.value)}
                />
                <span className="font-mono text-xs text-gray-400">USD</span>
              </div>
            </div>
          </div>
        </div>

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
  );
}
