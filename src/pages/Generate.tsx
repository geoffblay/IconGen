import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { generateIcon } from '../lib/openai';
import { useAuth } from '../contexts/AuthContext';
import ImageTracer from 'imagetracerjs';

const DAILY_LIMIT = 3;

export default function Generate() {
  const { user, credits, useCredits } = useAuth();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPng, setGeneratedPng] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [freeGenerationsLeft, setFreeGenerationsLeft] = useState(DAILY_LIMIT);

  useEffect(() => {
    if (!user) {
      const count = parseInt(localStorage.getItem('icon_generation_count') || '0');
      setFreeGenerationsLeft(Math.max(0, DAILY_LIMIT - count));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const png = await generateIcon(description);
      setGeneratedPng(png);
      if (user) {
        await useCredits(1, `Generated icon: ${description}`);
      } else {
        setFreeGenerationsLeft(prev => Math.max(0, prev - 1));
      }
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
            {user ? (
              <div className="mb-4 text-sm text-gray-600">
                Credits remaining: {credits}
              </div>
            ) : (
              <div className="mb-4 text-sm text-gray-600">
                Free generations remaining today: {freeGenerationsLeft}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Describe your icon</Label>
                <Input
                  id="description"
                  placeholder="e.g., a car driving on a road, a human figure waving"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  disabled={user ? credits <= 0 : freeGenerationsLeft <= 0}
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading || (user ? credits <= 0 : freeGenerationsLeft <= 0)}
              >
                {isLoading ? 'Generating...' : 'Generate Icon'}
              </Button>
            </form>

            {error && (
              <div className="mt-4 text-red-500">
                {error}
              </div>
            )}

            {generatedPng && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Generated Icon</h3>
                <div className="flex justify-center w-full bg-white rounded-lg p-4">
                  <img 
                    src={`data:image/png;base64,${generatedPng}`}
                    alt="Generated icon"
                    className="w-1/2 object-contain"
                  />
                </div>
                <div className="mt-4">
                  {user ? (
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
                        Sign up to download your icon and get 10 free credits!
                      </p>
                      <Button onClick={() => navigate('/signup')}>
                        Sign Up to Download
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