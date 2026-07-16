import { Shield, Zap, History } from 'lucide-react';

export default function FeatureBentoGrid() {
  return (
    <section
      className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-t border-brand-border"
      id="how-it-works"
    >
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] mb-12 text-center font-bold text-gray-400">
        Engineered for Performance
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bento Feature 1 (2 Cols wide) */}
        <div className="md:col-span-2 border border-brand-border p-8 flex flex-col justify-between min-h-[300px] bg-white">
          <div className="flex flex-col gap-4">
            <Shield size={36} className="text-black" />
            <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
              Institutional Grade Trust
            </h3>
            <p className="text-gray-600 max-w-md text-sm leading-relaxed">
              Our backend systems integrate directly with BYU-Pathway financial services, ensuring
              your tuition is credited within minutes of the transaction completion.
            </p>
          </div>
          <div className="flex gap-2 pt-6">
            <span className="px-3 py-1 border border-brand-border font-mono text-[9px] uppercase tracking-wider font-bold">
              ISO 27001
            </span>
            <span className="px-3 py-1 border border-brand-border font-mono text-[9px] uppercase tracking-wider font-bold">
              PCI DSS Compliant
            </span>
          </div>
        </div>

        {/* Bento Feature 2 (1 Col wide, Dark styled) */}
        <div className="border border-brand-border p-8 flex flex-col gap-6 bg-black text-white justify-between">
          <div className="space-y-4">
            <Zap size={36} className="text-brand-gold" />
            <h3 className="font-display text-2xl font-bold tracking-tight text-white">
              High-Velocity Infrastructure
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Zero lag, zero downtime. Designed for the specific connectivity needs of the
              Zimbabwe student node.
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
              Download Geist-styled monospaced receipts for every transaction to maintain your
              scholarship compliance effortlessly.
            </p>
          </div>
          <span className="font-mono text-[9px] uppercase text-gray-400 tracking-wider font-bold block border-t border-gray-100 pt-3">
            100% Tax Compliant
          </span>
        </div>

        {/* Bento Feature 4 (2 Cols wide, Image background) */}
        <div className="md:col-span-2 border border-brand-border overflow-hidden relative group min-h-[300px]">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 flex flex-col justify-end">
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              Pathway Connect Ready
            </h3>
            <p className="text-white/80 max-w-sm text-xs mt-2 leading-relaxed">
              From the first week of Connect to the final semester of your degree, WeduPay
              supports your entire academic journey.
            </p>
          </div>
          <div
            className="w-full h-full min-h-[300px] grayscale group-hover:grayscale-0 transition-all duration-700 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApDCjK26HfP4JM8HZSaMmaLS-1KmEJRknqCeHQoStDqOKPi-bGaw-1felimwquADE89GG7XCPo1TB2dd_qBtwXM_HrVpw7AM3sVz-MUskJQGLyO5jDl03iDK5f1hrLmcyUQnJ9S3WJxBbjRMaJ2bz0uC62qqY3UoXeONwvNICPeOI7p3p46p_RpH8zJ25ZQ2S9iKnD128b2XVLadjpVsshNLmEGt_UQXOfiyNjXHZkcN1Ovvp1nlDgvtwSr9iTNkfn3jQz-FwhWSZj')",
            }}
          />
        </div>
      </div>
    </section>
  );
}
