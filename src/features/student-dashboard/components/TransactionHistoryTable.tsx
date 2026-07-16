import { Transaction } from '@/shared/types';

interface TransactionHistoryTableProps {
  transactions: Transaction[];
  onExportClick: () => void;
}

export default function TransactionHistoryTable({ transactions, onExportClick }: TransactionHistoryTableProps) {
  return (
    <section className="mt-16" id="transactions">
      <div className="border border-brand-border bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-border flex justify-between items-center bg-white">
          <h3 className="font-display text-lg font-bold text-black">Transaction History</h3>
          <button
            onClick={onExportClick}
            className="font-mono text-[10px] uppercase text-gray-400 tracking-widest font-bold hover:text-black transition-colors"
          >
            Export Ledger
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-brand-border">
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Date</th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Description</th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Amount</th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((txn, index) => (
                <tr key={txn.id || index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-gray-500">{txn.date}</td>
                  <td className="px-6 py-4 text-xs font-sans font-bold text-black">{txn.description}</td>
                  <td className="px-6 py-4 text-xs font-mono font-bold text-black">${txn.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    {txn.status === 'Sent to BYU' && (
                      <span className="px-2 py-1 bg-[#ffe088]/30 text-[#745c00] border border-[#ffe088] font-mono text-[9px] uppercase font-bold tracking-wider">
                        Sent to BYU
                      </span>
                    )}
                    {txn.status === 'Processed' && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 border border-gray-200 font-mono text-[9px] uppercase font-bold tracking-wider">
                        Processed
                      </span>
                    )}
                    {txn.status === 'Pending Clearance' && (
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[9px] uppercase font-bold tracking-wider animate-pulse">
                        Pending Clearance
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
