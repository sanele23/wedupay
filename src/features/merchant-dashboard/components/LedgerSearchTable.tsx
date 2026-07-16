'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Transaction } from '@/shared/types';

interface LedgerSearchTableProps {
  transactions: Transaction[];
}

export default function LedgerSearchTable({ transactions }: LedgerSearchTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredTransactions = transactions.filter((t) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesId = t.id.toLowerCase().includes(searchLower);
    const matchesStudentName = t.studentName ? t.studentName.toLowerCase().includes(searchLower) : false;
    const matchesStudentId = t.studentId ? t.studentId.toLowerCase().includes(searchLower) : false;
    const matchesMethod = t.paymentMethod.toLowerCase().includes(searchLower);
    return matchesId || matchesStudentName || matchesStudentId || matchesMethod;
  });

  return (
    <section>
      <div className="border border-brand-border bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-border bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-display text-base font-extrabold text-black uppercase tracking-tight">
            Consolidated Ledger lookup
          </h3>

          <div className="flex items-center border border-brand-border p-2 bg-white w-full sm:w-72 focus-within:border-black">
            <Search size={14} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search Student, ID, Hash..."
              className="w-full bg-transparent border-none p-0 text-xs focus:outline-none focus:ring-0 font-sans"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-brand-border">
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Transaction</th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Student</th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Date</th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Amount</th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Channel</th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-xs font-mono text-gray-400 uppercase">
                    No matching transaction entries found in Zimbabwe Node.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono text-xs text-black font-bold">{t.id}</div>
                      <div className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                        Batch: {t.batchId}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-sans text-xs font-bold text-black">
                        {t.studentName || 'Tinashe Moyo'}
                      </div>
                      <div className="font-mono text-[9px] text-gray-400">ID: {t.studentId || '29-4822-1'}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-gray-500">{t.date}</td>
                    <td className="px-6 py-4 text-xs font-mono font-bold text-black">
                      ${t.amount.toFixed(2)} USD
                    </td>
                    <td className="px-6 py-4 text-xs font-sans text-gray-600">{t.paymentMethod}</td>
                    <td className="px-6 py-4">
                      {t.status === 'Sent to BYU' && (
                        <span className="px-2 py-1 bg-[#ffe088]/30 text-[#745c00] border border-[#ffe088] font-mono text-[9px] uppercase font-bold tracking-wider">
                          Sent to BYU
                        </span>
                      )}
                      {t.status === 'Processed' && (
                        <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 font-mono text-[9px] uppercase font-bold tracking-wider">
                          Processed
                        </span>
                      )}
                      {t.status === 'Pending Clearance' && (
                        <span className="px-2 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 font-mono text-[9px] uppercase font-bold tracking-wider animate-pulse">
                          Pending Clearance
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
