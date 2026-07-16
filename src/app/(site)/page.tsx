import HeroSection from '@/features/landing/components/HeroSection';
import FeatureBentoGrid from '@/features/landing/components/FeatureBentoGrid';
import TrustStats from '@/features/landing/components/TrustStats';

export default function LandingPage() {
  return (
    <div className="pt-28 md:pt-36">
      <HeroSection />
      <FeatureBentoGrid />
      <TrustStats />
    </div>
  );
}
