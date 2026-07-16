import React, { useState, useEffect } from 'react';
import { CheckCircle, ShieldAlert, Download, ArrowRight, Clock, ShieldCheck, Copy, Check, Users, ArrowLeft } from 'lucide-react';

interface SuccessProps {
  amountPaid: number;
  paymentMethod: string;
  onBackToDashboard: () => void;
}

export default function Success({ amountPaid, paymentMethod, onBackToDashboard }: SuccessProps) {
  const [txnHash, setTxnHash] = useState<string>('0x82f3c7e4a1b2d3e4f5a1');
  const [copied, setCopied] = useState<boolean>(false);
  const [advisorNotified, setAdvisorNotified] = useState<boolean>(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<string>('Sister Sibanda (Harare West)');
  const [batchId, setBatchId] = useState<string>('ZW-2024-09');

  // Generate a random-looking hash on mount for uniqueness
  useEffect(() => {
    const chars = '0123456789abcdef';
    let randomHash = '0x82f';
    for (let i = 0; i < 8; i++) {
      randomHash += chars[Math.floor(Math.random() * chars.length)];
    }
    randomHash += '...a1';
    setTxnHash(randomHash);

    // Generate batch code
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    setBatchId(`ZW-${year}-${month}`);
  }, []);

  const handleCopyHash = () => {
    setCopied(true);
    navigator.clipboard.writeText('0x82f3c7e4a1b2d3e4f5a1');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNotifyAdvisor = () => {
    setAdvisorNotified(true);
  };

  const handleDownloadReceipt = () => {
    // Generate a simple print-friendly version of the receipt
    const printWindow = window.open('', '_blank');
    if (printWindow) {
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
              <div class="row"><strong>Transaction Hash:</strong> <span>0x82f3c7e4a1b2d3e4f5a1</span></div>
              <div class="row"><strong>Student ID:</strong> <span>29-4822-1</span></div>
              <div class="row"><strong>Student Name:</strong> <span>Tinashe Moyo</span></div>
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
  };

  return (
    <div className="bg-brand-black text-white min-h-screen flex flex-col pt-20">
      
      {/* Decorative scan line animation style for Dark Ticket style */}
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

      {/* Main Success Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden">
        
        {/* Ambient atmospheric grid/glow */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-950/20 via-transparent to-transparent"></div>

        <div className="w-full max-w-[480px] z-10 space-y-8 animate-fade-in">
          
          {/* Digital Receipt Core Ticket */}
          <div className="bg-[#1c1b1c] border border-gray-800 relative success-glow">
            <div className="scanline"></div>

            {/* Digital Receipt Header */}
            <div className="p-8 flex flex-col items-center text-center border-b border-gray-800/60">
              <div className="mb-6">
                <div className="w-20 h-20 border-2 border-brand-gold flex items-center justify-center bg-brand-black/55 select-none">
                  <CheckCircle size={44} className="text-brand-gold" />
                </div>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-black text-white tracking-tight">Payment Confirmed</h1>
              <p className="font-sans text-xs text-gray-400 mt-2 leading-relaxed">
                Funds successfully secured for BYU-Pathway tuition.
              </p>
            </div>

            {/* Transaction Details Breakdown */}
            <div className="p-6 space-y-4 bg-brand-black/30">
              
              {/* Transaction Hash */}
              <div className="flex justify-between items-center py-2.5 border-b border-gray-800/40">
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">Transaction Hash</span>
                <button 
                  onClick={handleCopyHash}
                  className="font-mono text-[10px] text-white bg-gray-900 border border-gray-800 px-2.5 py-1 hover:text-brand-gold hover:border-brand-gold transition-all flex items-center gap-1.5"
                  title="Click to copy hash"
                >
                  {copied ? (
                    <>
                      <Check size={10} className="text-brand-gold" />
                      <span className="text-brand-gold text-[9px] font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={10} />
                      <span>{txnHash}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Amount Paid */}
              <div className="flex justify-between items-center py-2.5 border-b border-gray-800/40">
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">Amount Paid</span>
                <span className="font-display text-xl font-extrabold text-brand-gold">
                  ${amountPaid.toFixed(2)} USD
                </span>
              </div>

              {/* Pathway Batch ID */}
              <div className="flex justify-between items-center py-2.5 border-b border-gray-800/40">
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">Pathway Batch ID</span>
                <span className="font-mono text-xs font-bold text-white">{batchId}</span>
              </div>

              {/* Est. Arrival */}
              <div className="flex justify-between items-center py-2.5">
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">Est. Arrival</span>
                <div className="flex items-center gap-1.5 text-brand-gold">
                  <Clock size={12} />
                  <span className="font-mono text-[11px] font-bold">24 Hours</span>
                </div>
              </div>

            </div>

            {/* Security Protocol Anchor card */}
            <div className="px-6 pb-6">
              <div className="p-4 bg-brand-gold/5 border border-brand-gold/20 flex gap-3 items-start">
                <ShieldCheck size={18} className="text-brand-gold mt-0.5 shrink-0" />
                <div>
                  <p className="font-mono text-[9px] text-brand-gold uppercase tracking-wider font-bold mb-0.5">Security Protocol</p>
                  <p className="font-sans text-[11px] text-gray-400 leading-normal">
                    This transaction is verified via the WeduPay Zimbabwe Node and BYU-Pathway International disbursement ledger.
                  </p>
                </div>
              </div>
            </div>

            {/* Jagged Receipt edge bottom */}
            <div className="h-2 w-full receipt-edge opacity-20"></div>
          </div>

          {/* Interactive Advisor Notification Form / Action Output */}
          {advisorNotified ? (
            <div className="border border-brand-gold p-4 bg-brand-gold/10 font-mono text-xs text-center space-y-2 animate-fade-in">
              <CheckCircle size={20} className="text-brand-gold mx-auto" />
              <p className="text-white font-bold uppercase tracking-wider">Advisor Notified!</p>
              <p className="text-gray-300 text-[11px] font-sans">
                An official clearance report has been dispatched to <strong>{selectedAdvisor}</strong> to fast-track your university registration.
              </p>
            </div>
          ) : (
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
                  <option>Sister Sibanda (Harare West Stake)</option>
                  <option>Elder Moyo (Bulawayo Node)</option>
                  <option>President Khumalo (Mutare District)</option>
                  <option>Sister Davies (Salt Lake Central)</option>
                </select>
                <button 
                  onClick={handleNotifyAdvisor}
                  className="bg-white text-black font-mono text-[10px] font-bold uppercase tracking-wider px-4 py-2 hover:bg-brand-gold hover:text-black transition-colors shrink-0"
                >
                  Send Alert
                </button>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex flex-col gap-3">
            <button 
              onClick={handleDownloadReceipt}
              className="w-full bg-brand-gold text-black py-4 font-mono text-xs uppercase tracking-[0.18em] font-black hover:bg-brand-gold-hover transition-all flex items-center justify-center gap-2 group"
            >
              <span>Download PDF Receipt</span>
              <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
            
            <button 
              onClick={onBackToDashboard}
              className="w-full text-center py-2.5 text-gray-400 font-mono text-[10px] uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={12} />
              Return to Student Dashboard
            </button>
          </div>

        </div>
      </main>

      {/* Global success footer shell */}
      <footer className="w-full py-10 px-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto border-t border-gray-900 mt-auto bg-brand-black text-gray-500">
        <p className="font-mono text-[10px] uppercase tracking-wider mb-4 md:mb-0">© 2024 WeduPay Fintech. All Rights Reserved.</p>
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-wider">
          <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}
