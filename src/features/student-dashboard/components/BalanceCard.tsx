import { Landmark } from 'lucide-react';
import { StudentProfile } from '@/shared/types';

interface BalanceCardProps {
  profile: StudentProfile;
  onSettleFullBalance: () => void;
}

export default function BalanceCard({ profile, onSettleFullBalance }: BalanceCardProps) {
  return (
    <div className="border-2 border-brand-gold bg-white p-6 relative overflow-hidden">
      <div className="absolute top-4 right-4 text-brand-gold opacity-30">
        <Landmark size={24} />
      </div>
      <h3 className="font-mono text-[10px] uppercase text-gray-400 tracking-wider font-bold mb-1">
        Current Semester Balance Due
      </h3>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-4xl font-extrabold text-black">
          ${profile.balanceDue.toFixed(2)}
        </span>
        <span className="font-mono text-[11px] uppercase text-gray-400 tracking-wider font-bold">USD</span>
      </div>
      <p className="font-sans text-xs text-gray-500 mt-3 leading-relaxed">
        Next Installment due by 15th of the month.
      </p>
      <button
        onClick={onSettleFullBalance}
        className="w-full mt-6 bg-black text-white py-3.5 font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-gold hover:text-black transition-all active:scale-95"
      >
        Settle Full Balance
      </button>
    </div>
  );
}
