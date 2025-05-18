import PricingSection from '@/components/ui/pricing-section';
import ExamplesSection from '@/components/ui/examples-section';
import FeaturesSection from '@/components/ui/features-section';
import HeroSection from '@/components/ui/hero-section';

export default function Home() {
  return (
    <div>
        {/* Hero Section */}
        <HeroSection />

        {/* Examples section */}
        <ExamplesSection />

        {/* Feature section */}
        <FeaturesSection />
        
        {/* Pricing section */}
        <PricingSection />
    </div>
  );
}
