import { Smartphone, Landmark } from 'lucide-react';
import { PaymentMethod } from '@/shared/types';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export default function PaymentMethodSelector({ selectedMethod, onSelect }: PaymentMethodSelectorProps) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-black block mb-4">
        Step 1: Select Payment Method
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => onSelect('mobile_money')}
          className={`flex flex-col items-center justify-center border p-6 hover:border-black transition-all group ${
            selectedMethod === 'mobile_money' ? 'border-black bg-gray-50' : 'border-brand-border'
          }`}
        >
          <Smartphone
            size={24}
            className={`mb-2 transition-colors ${
              selectedMethod === 'mobile_money' ? 'text-black' : 'text-gray-400'
            }`}
          />
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-center">
            Mobile Money
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSelect('ecocash')}
          className={`flex flex-col items-center justify-center border p-6 hover:border-black transition-all group relative ${
            selectedMethod === 'ecocash' ? 'border-black bg-gray-50' : 'border-brand-border'
          }`}
        >
          <Landmark
            size={24}
            className={`mb-2 transition-colors ${
              selectedMethod === 'ecocash' ? 'text-black' : 'text-gray-400'
            }`}
          />
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-center">EcoCash</span>
          <span className="absolute -top-2.5 px-2 py-0.5 bg-brand-gold text-black text-[8px] font-mono font-bold tracking-widest uppercase">
            Most Popular
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSelect('bank_transfer')}
          className={`flex flex-col items-center justify-center border p-6 hover:border-black transition-all group ${
            selectedMethod === 'bank_transfer' ? 'border-black bg-gray-50' : 'border-brand-border'
          }`}
        >
          <Landmark
            size={24}
            className={`mb-2 transition-colors ${
              selectedMethod === 'bank_transfer' ? 'text-black' : 'text-gray-400'
            }`}
          />
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-center">
            Bank Transfer
          </span>
        </button>
      </div>
    </div>
  );
}
