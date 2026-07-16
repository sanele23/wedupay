'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ChevronRight, Loader2, Info, ArrowLeft } from 'lucide-react';
import { UserRole } from '@/shared/types';
import { useSessionStore } from '@/shared/store/useSessionStore';
import RoleToggle from './RoleToggle';
import StudentFields from './StudentFields';
import MerchantFields from './MerchantFields';

export default function AuthForm() {
  const [role, setRole] = useState<UserRole>('student');
  const [studentId, setStudentId] = useState<string>('29-4822-1');
  const [studentName, setStudentName] = useState<string>('Tinashe Moyo');
  const [merchantId, setMerchantId] = useState<string>('ZW-MERCH-88');
  const [merchantName, setMerchantName] = useState<string>('WeduPay Harare Admin');
  const [pin, setPin] = useState<string>('1234');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [terminalLog, setTerminalLog] = useState<string>('');

  const router = useRouter();
  const login = useSessionStore((state) => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTerminalLog('Contacting gateway auth services...');

    setTimeout(() => {
      setTerminalLog('Validating cryptographic credentials...');
      setTimeout(() => {
        setTerminalLog('Syncing with BYU-Pathway International ledger node...');
        setTimeout(() => {
          setTerminalLog('Handshake secure. Granting workspace permissions...');
          setTimeout(() => {
            setIsAuthenticating(false);
            if (role === 'student') {
              login('student', { name: studentName, id: studentId });
              router.push('/dashboard');
            } else {
              login('merchant', { name: merchantName, id: merchantId });
              router.push('/merchant');
            }
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  };

  return (
    <div className="pt-28 md:pt-36 max-w-md mx-auto px-6 py-12 relative grow flex items-center justify-center">
      <div className="w-full border-2 border-black bg-white p-6 md:p-8 relative transition-all duration-300">
        <div className="absolute -top-3.5 -right-2 px-3 py-1 bg-black text-white font-mono text-[10px] uppercase tracking-wider font-bold">
          Secure Authorization
        </div>

        <button
          onClick={() => router.push('/')}
          className="text-gray-400 hover:text-black font-mono text-[10px] uppercase tracking-widest font-bold mb-6 flex items-center gap-1.5 transition-colors focus:outline-none"
        >
          <ArrowLeft size={12} />
          Cancel
        </button>

        <div className="text-center mb-8">
          <span className="font-display text-2xl font-black text-black uppercase tracking-tighter">
            WeduPay Access
          </span>
          <p className="text-gray-500 font-sans text-xs mt-1">BYU-Pathway Tuition Clearance Portal</p>
        </div>

        <RoleToggle role={role} onChange={setRole} disabled={isAuthenticating} />

        <div className="border border-brand-border bg-gray-50 p-4 mb-6 space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest font-black text-black">
            <Info size={12} className="text-brand-gold shrink-0" />
            <span>Sandbox Environment</span>
          </div>
          <p className="text-[11px] text-gray-500 leading-normal">
            {role === 'student'
              ? 'Authorized with default credentials for Tinashe Moyo.'
              : 'Authorized with admin credentials for the WeduPay Harare Node.'}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {role === 'student' ? (
            <StudentFields
              studentName={studentName}
              onStudentNameChange={setStudentName}
              studentId={studentId}
              onStudentIdChange={setStudentId}
            />
          ) : (
            <MerchantFields
              merchantName={merchantName}
              onMerchantNameChange={setMerchantName}
              merchantId={merchantId}
              onMerchantIdChange={setMerchantId}
            />
          )}

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-widest text-black font-bold">
              Access Code / PIN
            </label>
            <div className="flex items-center border border-brand-border p-3.5 bg-white focus-within:border-black">
              <Lock size={16} className="text-gray-400 mr-2" />
              <input
                type="password"
                required
                maxLength={8}
                placeholder="••••"
                className="w-full bg-transparent border-none p-0 text-sm font-mono tracking-widest focus:outline-none focus:ring-0"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            {isAuthenticating ? (
              <div className="w-full bg-black text-white p-4 flex flex-col items-center justify-center gap-2 font-mono text-[10px] border-sharp-thick">
                <Loader2 size={18} className="text-brand-gold animate-spin" />
                <span className="text-brand-gold uppercase tracking-widest font-black animate-pulse">
                  Verifying Identity...
                </span>
                <span className="text-gray-500 text-[9px] mt-1 text-center font-mono block max-w-xs leading-normal">
                  {terminalLog}
                </span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-black text-white py-3.5 font-mono text-xs uppercase tracking-widest font-black hover:bg-brand-gold hover:text-black transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Authorize Entry
                <ChevronRight size={14} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
