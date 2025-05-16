import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { generateIcon } from '../lib/openai';
import { useAuth } from '../contexts/AuthContext';
import ImageTracer from 'imagetracerjs';
import { supabase } from '@/lib/supabase';


export default function Generate() {
  const { user, credits, useCredits } = useAuth();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPng, setGeneratedPng] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasPurchasedCredits, setHasPurchasedCredits] = useState(false);

  // check if user has purchased credits in the past
  useEffect(() => {
    const checkPurchaseHistory = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('credits')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'purchase')
        .limit(1);

      if (!error && data) {
        setHasPurchasedCredits(data.length > 0);
      }
    };

    checkPurchaseHistory();
  }, [user]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const png = await generateIcon(description);
      setGeneratedPng(png);
      await useCredits(1, `Generated icon: ${description}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate icon. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPng = () => {
    if (!user) {
      navigate('/signup');
      return;
    }

    const link = document.createElement('a');
    link.href = `data:image/png;base64,${generatedPng}`;
    link.download = 'icon.png';
    link.click();
  };

  const handleDownloadSvg = () => {
    if (!generatedPng) return;

    const img = new Image();
    img.src = `data:image/png;base64,${generatedPng}`;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);

      const svgString = ImageTracer.imagedataToSVG(imageData, {
        pathomit: 8,        // Simplify small paths
        numberofcolors: 2,  // Black & White SVG
        blurradius: 0,      // No blur
        ltres: 1,           // Line resolution
        qtres: 1            // Curve resolution
      });

      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'icon.svg';
      link.click();

      URL.revokeObjectURL(url);
    };

    img.onerror = (err) => {
      console.error('Failed to load image for SVG conversion:', err);
    };
  };


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Generate Your Icon
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Describe what you want, and we'll create it for you.
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-2xl p-6">
            <div className="mb-4 text-sm text-gray-600">
              Credits remaining: {credits}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Describe your icon</Label>
                <Input
                  id="description"
                  placeholder="e.g., a car driving on a road, a human figure waving"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  // disabled={user ? credits <= 0 : freeGenerationsLeft <= 0}
                  disabled={credits <= 0}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  type="submit"
                  disabled={isLoading || (credits <= 0)}
                >
                  {isLoading ? 'Generating...' : 'Generate Icon'}
                  {isLoading && (
                    <svg
                      className="animate-spin h-5 w-5 ml-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  )}
                </Button>
                {isLoading && <p className="text-sm text-gray-600">This could take a minute...</p>}
              </div>
            </form>

            {error && (
              <div className="mt-4 text-red-500">
                {error}
              </div>
            )}

            {generatedPng && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Generated Icon</h3>
                <div className="flex justify-center w-full bg-white rounded-lg p-4 relative">
                  <img
                    src={`data:image/png;base64,${generatedPng}`}
                    alt="Generated icon"
                    className="w-1/2 object-contain select-none pointer-events-none"
                    onContextMenu={(e) => !hasPurchasedCredits && e.preventDefault()}
                    onDragStart={(e) => !hasPurchasedCredits && e.preventDefault()}
                  />
                  {!hasPurchasedCredits && (
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      style={{ userSelect: 'none' }}
                    >
                      <div className="absolute inset-0 bg-white/30"></div>
                      <div className="text-2xl font-bold text-gray-400 transform -rotate-45 select-none">
                        PREVIEW
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  {hasPurchasedCredits ? (
                    <div className="flex space-x-4">
                      <Button onClick={handleDownloadPng}>
                        Download PNG
                      </Button>
                      <Button onClick={handleDownloadSvg} variant="outline">
                        Download SVG
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-600 mb-4">
                        Purchase credits to download your icon!
                      </p>
                      <Button onClick={() => {
                        navigate('/');
                        // Use setTimeout to ensure the navigation completes before scrolling
                        setTimeout(() => {
                          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}>
                        View Pricing
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
} 