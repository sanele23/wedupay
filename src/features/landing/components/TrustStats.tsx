export default function TrustStats() {
  return (
    <section className="bg-gray-50 py-16 border-t border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">
            Global Standards
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            Transparency is our primary component.
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We strip away the complexities of cross-border finance to give you a clear, 1:1 view
            of your tuition status. No hidden fees, no complicated math.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-black">
              12k+
            </span>
            <span className="font-mono text-[10px] uppercase text-gray-500 tracking-wider font-bold">
              Students Served
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-black">
              $2.4M
            </span>
            <span className="font-mono text-[10px] uppercase text-gray-500 tracking-wider font-bold">
              Tuition Processed
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-black">
              99.9%
            </span>
            <span className="font-mono text-[10px] uppercase text-gray-500 tracking-wider font-bold">
              Success Rate
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-black">
              0%
            </span>
            <span className="font-mono text-[10px] uppercase text-gray-500 tracking-wider font-bold">
              Hidden Fees
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
