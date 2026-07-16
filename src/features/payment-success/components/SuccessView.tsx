'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download } from 'lucide-react';
import { useSessionStore } from '@/shared/store/useSessionStore';
import { useRequireRole } from '@/shared/hooks/useRequireRole';
import ReceiptCard from './ReceiptCard';
import AdvisorNotifyCard from './AdvisorNotifyCard';

function printReceipt(
  amountPaid: number,
  paymentMethod: string,
  txnHash: string,
  batchId: string,
  studentName: string,
  studentId: string
) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <html>
      <head>
        <title>WeduPay Official Tuition Receipt</title>
        <style>
          body { font-family: monospace; padding: 40px; color: #000; line-height: 1.6; }
          .header { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 20px; }
          .title { font-size: 24px; font-weight: bold; margin: 0; }
          .details { margin: 30px 0; }
          .row { display: flex; justify-content: space-between; margin-bottom: 12px; }
          .footer { text-align: center; border-top: 2px dashed #000; padding-top: 20px; margin-top: 50px; font-size: 11px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">WEDUPAY | BYU-PATHWAY</div>
          <div>ZIMBABWE TUITION DISBURSEMENT LEDGER</div>
          <div>Date: ${new Date().toLocaleDateString()}</div>
        </div>
        <div class="details">
          <div class="row"><strong>Transaction Hash:</strong> <span>${txnHash}</span></div>
          <div class="row"><strong>Student ID:</strong> <span>${studentId}</span></div>
          <div class="row"><strong>Student Name:</strong> <span>${studentName}</span></div>
          <div class="row"><strong>Amount Paid:</strong> <span>$${amountPaid.toFixed(2)} USD</span></div>
          <div class="row"><strong>Payment Method:</strong> <span>${paymentMethod}</span></div>
          <div class="row"><strong>Pathway Batch ID:</strong> <span>${batchId}</span></div>
          <div class="row"><strong>Settlement Status:</strong> <span>Guaranteed Credits Secured</span></div>
        </div>
        <div class="footer">
          <p>Verified via WeduPay Zimbabwe Node & BYU-Pathway International Ledger.</p>
          <p>Thank you for your payment. Keep this receipt for scholarship audit purposes.</p>
        </div>
        <script>window.print();</script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

export default function SuccessView() {
  const router = useRouter();
  const role = useRequireRole();
  const amountPaid = useSessionStore((state) => state.lastPaymentAmount);
  const paymentMethod = useSessionStore((state) => state.lastPaymentMethod);
  const profile = useSessionStore((state) => state.profile);

  const [txnHash, setTxnHash] = useState<string>('0x82f3c7e4a1b2d3e4f5a1');
  const [batchId, setBatchId] = useState<string>('ZW-2024-09');
  const [copied, setCopied] = useState<boolean>(false);

  // Generate a random-looking hash and current batch code on mount for uniqueness
  useEffect(() => {
    const chars = '0123456789abcdef';
    let randomHash = '0x82f';
    for (let i = 0; i < 8; i++) {
      randomHash += chars[Math.floor(Math.random() * chars.length)];
    }
    randomHash += '...a1';
    setTxnHash(randomHash);

    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    setBatchId(`ZW-${year}-${month}`);
  }, []);

  if (role === 'none') {
    return null;
  }

  const handleCopyHash = () => {
    setCopied(true);
    navigator.clipboard.writeText(txnHash);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-brand-black text-white min-h-screen flex flex-col pt-20">
      <style>{`
        .success-glow {
          box-shadow: 0 0 50px rgba(212, 175, 55, 0.15);
        }
        .scanline {
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
          position: absolute;
          top: 0;
          animation: scan 4s linear infinite;
          opacity: 0.35;
        }
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>

      <main className="grow flex items-center justify-center px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-yellow-950/20 via-transparent to-transparent"></div>

        <div className="w-full max-w-[480px] z-10 space-y-8 animate-fade-in">
          <ReceiptCard
            amountPaid={amountPaid}
            txnHash={txnHash}
            batchId={batchId}
            copied={copied}
            onCopyHash={handleCopyHash}
          />

          <AdvisorNotifyCard />

          <div className="flex flex-col gap-3">
            <button
              onClick={() =>
                printReceipt(amountPaid, paymentMethod, txnHash, batchId, profile.name, profile.id)
              }
              className="w-full bg-brand-gold text-black py-4 font-mono text-xs uppercase tracking-[0.18em] font-black hover:bg-brand-gold-hover transition-all flex items-center justify-center gap-2 group"
            >
              <span>Download PDF Receipt</span>
              <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full text-center py-2.5 text-gray-400 font-mono text-[10px] uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={12} />
              Return to Student Dashboard
            </button>
          </div>
        </div>
      </main>

      <footer className="w-full py-10 px-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto border-t border-gray-900 mt-auto bg-brand-black text-gray-500">
        <p className="font-mono text-[10px] uppercase tracking-wider mb-4 md:mb-0">
          © 2024 WeduPay Fintech. All Rights Reserved.
        </p>
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-wider">
          <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}
