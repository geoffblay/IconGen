import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        <div>
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
                            className="text-lg px-8 py-6 border-2 bg-gray-950 text-purple-200 border-gray-950"
                        >
                            Get Started
                        </Button>
                        <Button
                            size="lg"
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-lg px-8 py-6 bg-transparent border-2 border-gray-950 text-gray-950 hover:bg-purple-300"
                        >
                            View Pricing
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}