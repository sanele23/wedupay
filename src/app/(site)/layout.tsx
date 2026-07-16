import Navbar from '@/shared/components/Navbar';
import Footer from '@/shared/components/Footer';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="grow">{children}</div>
      <Footer />
    </>
  );
}
