import { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { generateIcon } from '../lib/openai';
import { useAuth } from '../contexts/AuthContext';

const DAILY_LIMIT = 3;

export default function Generate() {
  const { user, credits, useCredits } = useAuth();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSvg, setGeneratedSvg] = useState<string | null>(null);
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
      const svg = await generateIcon(description, !!user);
      setGeneratedSvg(svg);
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

  const handleDownload = () => {
    if (!user) {
      navigate('/signup');
      return;
    }
    // TODO: Implement download functionality
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

            {generatedSvg && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Generated Icon</h3>
                <div 
                  className="w-full aspect-square bg-white rounded-lg p-4"
                  dangerouslySetInnerHTML={{ __html: generatedSvg }}
                />
                <div className="mt-4">
                  {user ? (
                    <Button onClick={handleDownload}>
                      Download Icon
                    </Button>
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