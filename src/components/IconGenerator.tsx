import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { generateIcon } from '../lib/openai';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function IconGenerator() {
  const { user, credits, useCredits } = useAuth();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPng, setGeneratedPng] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (credits <= 0) {
      setError('You have no credits remaining. Please purchase more credits to continue.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const png = await generateIcon(description);
      const success = await useCredits(1, `Generated icon: ${description}`);
      if (!success) {
        throw new Error('Failed to use credits');
      }
      setGeneratedPng(png);
    } catch (err) {
      setError('Failed to generate icon. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl p-6">
      {user ? (
        <div className="mb-4 text-sm text-gray-600">
          Credits remaining: {credits}
        </div>
      ) : (
        <div className="mb-4 text-sm text-gray-600">
          Please <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline">log in</button> to generate icons
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="description">Describe your icon</Label>
          <Input
            id="description"
            placeholder="e.g., a car driving on a road, a human figure waving"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={!user || credits <= 0}
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !user || credits <= 0}
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
          <div 
            className="w-full aspect-square bg-white rounded-lg p-4"
            dangerouslySetInnerHTML={{ __html: generatedPng }}
          />
        </div>
      )}
    </Card>
  );
} 