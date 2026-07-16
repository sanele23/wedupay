import { CheckCircle } from 'lucide-react';
import RateCalculatorCard from './RateCalculatorCard';

export default function HeroSection() {
  return (
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
            Seamless tuition payments for BYU-Pathway students in Zimbabwe. We bridge the gap
            between local currency and global education with architectural precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-brand-border mt-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-brand-gold h-5 w-5" fill="currentColor" stroke="#fff" />
              <span className="font-mono text-xs uppercase tracking-wider text-black font-bold">
                Instant Settlement
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-brand-gold h-5 w-5" fill="currentColor" stroke="#fff" />
              <span className="font-mono text-xs uppercase tracking-wider text-black font-bold">
                Direct BYU-Portal Sync
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-brand-gold h-5 w-5" fill="currentColor" stroke="#fff" />
              <span className="font-mono text-xs uppercase tracking-wider text-black font-bold">
                Local Support
              </span>
            </div>
          </div>
        </div>

        <RateCalculatorCard />
      </div>
    </section>
  );
}
