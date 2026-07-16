import Image from 'next/image';
import { StudentProfile } from '@/shared/types';

interface ProfileCardProps {
  profile: StudentProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="border border-brand-border bg-white p-6 relative">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 border border-brand-border overflow-hidden select-none relative">
          <Image className="object-cover" alt={profile.name} src={profile.avatarUrl} fill sizes="64px" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-black leading-tight">{profile.name}</h2>
          <p className="font-mono text-[10px] uppercase text-gray-400 tracking-widest mt-1">
            ID: {profile.id}
          </p>
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center text-xs">
          <span className="font-mono uppercase text-gray-400 font-bold">Program</span>
          <span className="font-sans font-bold text-black">{profile.program}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="font-mono uppercase text-gray-400 font-bold">Status</span>
          <span className="font-sans text-green-700 bg-green-50 px-2 py-0.5 font-bold border border-green-200">
            {profile.status}
          </span>
        </div>
      </div>
    </div>
  );
}
