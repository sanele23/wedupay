import React, { useState } from 'react';
import { ShieldCheck, User, Landmark, Lock, Key, ChevronRight, Loader2, Info, ArrowLeft } from 'lucide-react';
import { UserRole } from '../types';

interface AuthProps {
  onLoginSuccess: (role: UserRole, userDetails: { name: string; id: string }) => void;
  onCancel: () => void;
}

export default function Auth({ onLoginSuccess, onCancel }: AuthProps) {
  const [role, setRole] = useState<UserRole>('student');
  const [studentId, setStudentId] = useState<string>('29-4822-1');
  const [studentName, setStudentName] = useState<string>('Tinashe Moyo');
  const [merchantId, setMerchantId] = useState<string>('ZW-MERCH-88');
  const [merchantName, setMerchantName] = useState<string>('WeduPay Harare Admin');
  const [pin, setPin] = useState<string>('1234');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [terminalLog, setTerminalLog] = useState<string>('');

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
              onLoginSuccess('student', { name: studentName, id: studentId });
            } else {
              onLoginSuccess('merchant', { name: merchantName, id: merchantId });
            }
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  };

  return (
    <div className="pt-28 md:pt-36 max-w-md mx-auto px-6 py-12 relative flex-grow flex items-center justify-center">
      <div className="w-full border-2 border-black bg-white p-6 md:p-8 relative transition-all duration-300">
        
        {/* Absolute Banner Accent */}
        <div className="absolute -top-3.5 -right-2 px-3 py-1 bg-black text-white font-mono text-[10px] uppercase tracking-wider font-bold">
          Secure Authorization
        </div>

        {/* Back navigation */}
        <button 
          onClick={onCancel}
          className="text-gray-400 hover:text-black font-mono text-[10px] uppercase tracking-widest font-bold mb-6 flex items-center gap-1.5 transition-colors focus:outline-none"
        >
          <ArrowLeft size={12} />
          Cancel
        </button>

        {/* Title */}
        <div className="text-center mb-8">
          <span className="font-display text-2xl font-black text-black uppercase tracking-tighter">
            WeduPay Access
          </span>
          <p className="text-gray-500 font-sans text-xs mt-1">BYU-Pathway Tuition Clearance Portal</p>
        </div>

        {/* Role Toggles */}
        <div className="grid grid-cols-2 border border-brand-border mb-8">
          <button
            type="button"
            onClick={() => { if (!isAuthenticating) setRole('student'); }}
            disabled={isAuthenticating}
            className={`py-3 font-mono text-[11px] uppercase tracking-wider font-bold transition-all text-center border-r border-brand-border ${
              role === 'student' ? 'bg-black text-white' : 'text-gray-500 hover:text-black bg-white'
            }`}
          >
            Student Login
          </button>
          <button
            type="button"
            onClick={() => { if (!isAuthenticating) setRole('merchant'); }}
            disabled={isAuthenticating}
            className={`py-3 font-mono text-[11px] uppercase tracking-wider font-bold transition-all text-center ${
              role === 'merchant' ? 'bg-black text-white' : 'text-gray-500 hover:text-black bg-white'
            }`}
          >
            Merchant Admin
          </button>
        </div>

        {/* Dynamic Warning Helper */}
        <div className="border border-brand-border bg-gray-50 p-4 mb-6 space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest font-black text-black">
            <Info size={12} className="text-brand-gold shrink-0" />
            <span>Sandbox Environment</span>
          </div>
          <p className="text-[11px] text-gray-500 leading-normal">
            {role === 'student' 
              ? 'Authorized with default credentials for Tinashe Moyo.'
              : 'Authorized with admin credentials for the WeduPay Harare Node.'
            }
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {role === 'student' ? (
            <>
              {/* Student Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-black font-bold">
                  Student Name
                </label>
                <div className="flex items-center border border-brand-border p-3.5 bg-white focus-within:border-black">
                  <User size={16} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-none p-0 text-sm font-sans focus:outline-none focus:ring-0"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>
              </div>

              {/* Student ID */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-black font-bold">
                  BYU Student ID
                </label>
                <div className="flex items-center border border-brand-border p-3.5 bg-white focus-within:border-black">
                  <Key size={16} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 29-4822-1"
                    className="w-full bg-transparent border-none p-0 text-sm font-mono focus:outline-none focus:ring-0"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Merchant Name */}
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
                    onChange={(e) => setMerchantName(e.target.value)}
                  />
                </div>
              </div>

              {/* Merchant ID */}
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
                    onChange={(e) => setMerchantId(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* Secure Pin */}
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

          {/* Submit Action */}
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
