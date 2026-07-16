import { Landmark, Key } from 'lucide-react';

interface MerchantFieldsProps {
  merchantName: string;
  onMerchantNameChange: (value: string) => void;
  merchantId: string;
  onMerchantIdChange: (value: string) => void;
}

export default function MerchantFields({
  merchantName,
  onMerchantNameChange,
  merchantId,
  onMerchantIdChange,
}: MerchantFieldsProps) {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[10px] uppercase tracking-widest text-black font-bold">
          Merchant Agent Name
        </label>
        <div className="flex items-center border border-brand-border p-3.5 bg-white focus-within:border-black">
          <Landmark size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            required
            className="w-full bg-transparent border-none p-0 text-sm font-sans focus:outline-none focus:ring-0"
            value={merchantName}
            onChange={(e) => onMerchantNameChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[10px] uppercase tracking-widest text-black font-bold">
          Merchant Node ID
        </label>
        <div className="flex items-center border border-brand-border p-3.5 bg-white focus-within:border-black">
          <Key size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            required
            className="w-full bg-transparent border-none p-0 text-sm font-mono focus:outline-none focus:ring-0"
            value={merchantId}
            onChange={(e) => onMerchantIdChange(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
