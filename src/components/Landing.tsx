import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Shield, Activity, RefreshCw, Zap, Clock, History } from 'lucide-react';
import { EXCHANGE_RATE_ZWL_USD } from '../data';

interface LandingProps {
  onLaunchApp: (prefilledAmountUSD?: number) => void;
}

export default function Landing({ onLaunchApp }: LandingProps) {
  const [payAmount, setPayAmount] = useState<string>('50000');
  const [receiveAmount, setReceiveAmount] = useState<string>('150.00');
  const [isZwlToUsd, setIsZwlToUsd] = useState<boolean>(true);
  const [rotate, setRotate] = useState<boolean>(false);

  // Recalculate whenever payAmount or direction changes
  useEffect(() => {
    const val = parseFloat(payAmount) || 0;
    if (isZwlToUsd) {
      const converted = (val / EXCHANGE_RATE_ZWL_USD).toFixed(2);
      setReceiveAmount(converted);
    } else {
      const converted = (val * EXCHANGE_RATE_ZWL_USD).toFixed(2);
      setReceiveAmount(converted);
    }
  }, [payAmount, isZwlToUsd]);

  const handleFlip = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 500);
    
    // Swap the current state and calculate the new inputs
    const tempPay = payAmount;
    setPayAmount(receiveAmount);
    setReceiveAmount(tempPay);
    setIsZwlToUsd(!isZwlToUsd);
  };

  const handleContinue = () => {
    const usdAmount = isZwlToUsd ? parseFloat(receiveAmount) : parseFloat(payAmount);
    onLaunchApp(usdAmount > 0 ? usdAmount : undefined);
  };

  return (
    <div className="pt-28 md:pt-36">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Hero Left Copy */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-block px-3 py-1 bg-[#fed65b]/20 border border-[#735c00] text-[#735c00] w-fit font-mono text-[11px] uppercase tracking-wider font-bold">
              Fintech for Education
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-black leading-tight">
              Your Pathway to BYU, Simplified.
            </h1>
            <p className="text-gray-600 text-lg max-w-xl font-sans leading-relaxed">
              Seamless tuition payments for BYU-Pathway students in Zimbabwe. We bridge the gap between local currency and global education with architectural precision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-brand-border mt-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-brand-gold h-5 w-5" fill="currentColor" stroke="#fff" />
                <span className="font-mono text-xs uppercase tracking-wider text-black font-bold">Instant Settlement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-brand-gold h-5 w-5" fill="currentColor" stroke="#fff" />
                <span className="font-mono text-xs uppercase tracking-wider text-black font-bold">Direct BYU-Portal Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-brand-gold h-5 w-5" fill="currentColor" stroke="#fff" />
                <span className="font-mono text-xs uppercase tracking-wider text-black font-bold">Local Support</span>
              </div>
            </div>
          </div>

          {/* Quote Widget Card (Right Column) */}
          <div className="lg:col-span-5" id="rates">
            <div className="border-2 border-black p-6 flex flex-col gap-6 bg-white relative transition-all duration-300">
              <div className="absolute -top-3.5 -right-2 px-3 py-1 bg-black text-white font-mono text-[10px] uppercase tracking-wider font-bold">
                Zero Hidden Fees
              </div>
              
              {/* Pay Input */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                  {isZwlToUsd ? "You Pay (ZWL Amount)" : "You Pay (USD Amount)"}
                </label>
                <div className="flex items-center border border-brand-border p-4 bg-white">
                  <input 
                    type="number"
                    className="w-full bg-transparent border-none p-0 text-2xl font-bold font-display focus:outline-none"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    placeholder="0.00"
                  />
                  <span className="font-display text-lg font-black ml-2 text-black">
                    {isZwlToUsd ? "ZWL" : "USD"}
                  </span>
                </div>
              </div>

              {/* Currency Flip Button */}
              <div className="flex justify-center -my-9 z-10">
                <button 
                  onClick={handleFlip}
                  className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
                  title="Flip Currency Conversion"
                >
                  <RefreshCw 
                    size={20} 
                    className={`text-black transition-transform duration-500 ${rotate ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              {/* Receive Output */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                  {isZwlToUsd ? "Tuition Credit (Guaranteed USD)" : "Tuition Cost (ZWL Equivalent)"}
                </label>
                <div className="flex items-center border border-brand-border p-4 bg-gray-50">
                  <input 
                    type="text"
                    readOnly
                    className="w-full bg-transparent border-none p-0 text-2xl font-bold font-display text-brand-gold focus:outline-none"
                    value={isZwlToUsd ? `$${receiveAmount}` : receiveAmount}
                  />
                  <span className="font-display text-lg font-black ml-2 text-brand-gold">
                    {isZwlToUsd ? "USD" : "ZWL"}
                  </span>
                </div>
              </div>

              {/* Rate & Fee breakdown */}
              <div className="flex flex-col gap-3 border-t border-brand-border pt-4 mt-2">
                <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest font-bold">
                  <span className="text-gray-500">Exchange Rate</span>
                  <span className="text-black">1 USD = {EXCHANGE_RATE_ZWL_USD} ZWL</span>
                </div>
                <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest font-bold">
                  <span className="text-gray-500">Processing Fee</span>
                  <span className="text-brand-gold">$0.00 (Zero Fee)</span>
                </div>
              </div>

              <button 
                onClick={handleContinue}
                className="w-full py-4 bg-black text-white font-mono text-xs uppercase tracking-widest font-black hover:bg-brand-gold hover:text-black transition-colors duration-300"
              >
                Continue to Payment
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-t border-brand-border" id="how-it-works">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] mb-12 text-center font-bold text-gray-400">
          Engineered for Performance
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Feature 1 (2 Cols wide) */}
          <div className="md:col-span-2 border border-brand-border p-8 flex flex-col justify-between min-h-[300px] bg-white">
            <div className="flex flex-col gap-4">
              <Shield size={36} className="text-black" />
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Institutional Grade Trust</h3>
              <p className="text-gray-600 max-w-md text-sm leading-relaxed">
                Our backend systems integrate directly with BYU-Pathway financial services, ensuring your tuition is credited within minutes of the transaction completion.
              </p>
            </div>
            <div className="flex gap-2 pt-6">
              <span className="px-3 py-1 border border-brand-border font-mono text-[9px] uppercase tracking-wider font-bold">ISO 27001</span>
              <span className="px-3 py-1 border border-brand-border font-mono text-[9px] uppercase tracking-wider font-bold">PCI DSS Compliant</span>
            </div>
          </div>

          {/* Bento Feature 2 (1 Col wide, Dark styled) */}
          <div className="border border-brand-border p-8 flex flex-col gap-6 bg-black text-white justify-between">
            <div className="space-y-4">
              <Zap size={36} className="text-brand-gold" />
              <h3 className="font-display text-2xl font-bold tracking-tight text-white">High-Velocity Infrastructure</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Zero lag, zero downtime. Designed for the specific connectivity needs of the Zimbabwe student node.
              </p>
            </div>
            <div className="font-mono text-[10px] text-brand-gold uppercase tracking-widest font-black flex items-center gap-1">
              Active Server <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-ping"></span>
            </div>
          </div>

          {/* Bento Feature 3 (1 Col wide, Light styled) */}
          <div className="border border-brand-border p-8 flex flex-col gap-4 bg-white justify-between">
            <div className="space-y-4">
              <History size={36} className="text-black" />
              <h3 className="font-display text-xl font-bold tracking-tight">Audit-Ready Ledger</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Download Geist-styled monospaced receipts for every transaction to maintain your scholarship compliance effortlessly.
              </p>
            </div>
            <span className="font-mono text-[9px] uppercase text-gray-400 tracking-wider font-bold block border-t border-gray-100 pt-3">
              100% Tax Compliant
            </span>
          </div>

          {/* Bento Feature 4 (2 Cols wide, Image background) */}
          <div className="md:col-span-2 border border-brand-border overflow-hidden relative group min-h-[300px]">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 flex flex-col justify-end">
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">Pathway Connect Ready</h3>
              <p className="text-white/80 max-w-sm text-xs mt-2 leading-relaxed">
                From the first week of Connect to the final semester of your degree, WeduPay supports your entire academic journey.
              </p>
            </div>
            <div 
              className="w-full h-full min-h-[300px] grayscale group-hover:grayscale-0 transition-all duration-700 bg-cover bg-center"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApDCjK26HfP4JM8HZSaMmaLS-1KmEJRknqCeHQoStDqOKPi-bGaw-1felimwquADE89GG7XCPo1TB2dd_qBtwXM_HrVpw7AM3sVz-MUskJQGLyO5jDl03iDK5f1hrLmcyUQnJ9S3WJxBbjRMaJ2bz0uC62qqY3UoXeONwvNICPeOI7p3p46p_RpH8zJ25ZQ2S9iKnD128b2XVLadjpVsshNLmEGt_UQXOfiyNjXHZkcN1Ovvp1nlDgvtwSr9iTNkfn3jQz-FwhWSZj')" }}
              referrerPolicy="no-referrer"
            />
          </div>

        </div>
      </section>

      {/* Dynamic Trust Stats Section */}
      <section className="bg-gray-50 py-16 border-t border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">Global Standards</span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Transparency is our primary component.</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We strip away the complexities of cross-border finance to give you a clear, 1:1 view of your tuition status. No hidden fees, no complicated math.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <span className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-black">12k+</span>
              <span className="font-mono text-[10px] uppercase text-gray-500 tracking-wider font-bold">Students Served</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-black">$2.4M</span>
              <span className="font-mono text-[10px] uppercase text-gray-500 tracking-wider font-bold">Tuition Processed</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-black">99.9%</span>
              <span className="font-mono text-[10px] uppercase text-gray-500 tracking-wider font-bold">Success Rate</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-black">0%</span>
              <span className="font-mono text-[10px] uppercase text-gray-500 tracking-wider font-bold">Hidden Fees</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
