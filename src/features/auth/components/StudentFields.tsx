import { User, Key } from 'lucide-react';

interface StudentFieldsProps {
  studentName: string;
  onStudentNameChange: (value: string) => void;
  studentId: string;
  onStudentIdChange: (value: string) => void;
}

export default function StudentFields({
  studentName,
  onStudentNameChange,
  studentId,
  onStudentIdChange,
}: StudentFieldsProps) {
  return (
    <>
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
            onChange={(e) => onStudentNameChange(e.target.value)}
          />
        </div>
      </div>

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
            onChange={(e) => onStudentIdChange(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
