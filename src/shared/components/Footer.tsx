export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-gray-50 mt-auto">
      <div className="w-full py-12 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-6 text-gray-500">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <span className="font-display text-lg font-black text-black">WeduPay</span>
          <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
            © 2024 WeduPay Fintech. All Rights Reserved.
          </p>
        </div>
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest">
          <a href="#" className="hover:text-brand-gold transition-colors duration-200">Terms of Service</a>
          <a href="#" className="hover:text-brand-gold transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-brand-gold transition-colors duration-200">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}
