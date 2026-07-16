'use client';

import { useState } from 'react';
import { CheckCircle, Users } from 'lucide-react';

const ADVISORS = [
  'Sister Sibanda (Harare West Stake)',
  'Elder Moyo (Bulawayo Node)',
  'President Khumalo (Mutare District)',
  'Sister Davies (Salt Lake Central)',
];

export default function AdvisorNotifyCard() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<string>(ADVISORS[0]);
  const [advisorNotified, setAdvisorNotified] = useState<boolean>(false);

  if (advisorNotified) {
    return (
      <div className="border border-brand-gold p-4 bg-brand-gold/10 font-mono text-xs text-center space-y-2 animate-fade-in">
        <CheckCircle size={20} className="text-brand-gold mx-auto" />
        <p className="text-white font-bold uppercase tracking-wider">Advisor Notified!</p>
        <p className="text-gray-300 text-[11px] font-sans">
          An official clearance report has been dispatched to <strong>{selectedAdvisor}</strong> to
          fast-track your university registration.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-gray-800 p-4 bg-[#1c1b1c]/50 space-y-3">
      <div className="flex items-center gap-2 font-mono text-[10px] text-gray-400 uppercase font-black tracking-widest">
        <Users size={14} className="text-brand-gold" />
        <span>Notify Pathway Advisor</span>
      </div>
      <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
        Select your local missionary or BYU-Pathway advisor to forward this payment clearance.
      </p>
      <div className="flex gap-2">
        <select
          className="bg-brand-black border border-gray-800 text-xs text-white p-2.5 w-full focus:border-brand-gold focus:ring-0 rounded-none font-sans"
          value={selectedAdvisor}
          onChange={(e) => setSelectedAdvisor(e.target.value)}
        >
          {ADVISORS.map((advisor) => (
            <option key={advisor}>{advisor}</option>
          ))}
        </select>
        <button
          onClick={() => setAdvisorNotified(true)}
          className="bg-white text-black font-mono text-[10px] font-bold uppercase tracking-wider px-4 py-2 hover:bg-brand-gold hover:text-black transition-colors shrink-0"
        >
          Send Alert
        </button>
      </div>
    </div>
  );
}
