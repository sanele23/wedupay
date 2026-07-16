import { UserRole } from '@/shared/types';

interface RoleToggleProps {
  role: UserRole;
  onChange: (role: UserRole) => void;
  disabled: boolean;
}

export default function RoleToggle({ role, onChange, disabled }: RoleToggleProps) {
  return (
    <div className="grid grid-cols-2 border border-brand-border mb-8">
      <button
        type="button"
        onClick={() => onChange('student')}
        disabled={disabled}
        className={`py-3 font-mono text-[11px] uppercase tracking-wider font-bold transition-all text-center border-r border-brand-border ${
          role === 'student' ? 'bg-black text-white' : 'text-gray-500 hover:text-black bg-white'
        }`}
      >
        Student Login
      </button>
      <button
        type="button"
        onClick={() => onChange('merchant')}
        disabled={disabled}
        className={`py-3 font-mono text-[11px] uppercase tracking-wider font-bold transition-all text-center ${
          role === 'merchant' ? 'bg-black text-white' : 'text-gray-500 hover:text-black bg-white'
        }`}
      >
        Merchant Admin
      </button>
    </div>
  );
}
