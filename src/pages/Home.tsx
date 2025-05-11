import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import PricingSection from '@/components/ui/pricing-section';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Create Beautiful Icons with AI
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into stunning vector-style icons in seconds. Perfect for apps, websites, and presentations.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/generate')}
              className="text-lg px-8 py-6"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-8 py-6"
            >
              View Pricing
            </Button>
          </div>
        </div>

        {/* Feature section */}
        <div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-600">Generate unique icons from simple text descriptions using advanced AI.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Vector Quality</h3>
            <p className="text-gray-600">Get high-quality, scalable icons perfect for any size or resolution.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
            <p className="text-gray-600">Download your icons immediately in multiple formats.</p>
          </div>
        </div>
        
        {/* Pricing section */}
        <PricingSection />
      </div>
    </div>
  );
}
