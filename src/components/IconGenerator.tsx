import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { generateIcon } from '../lib/openai';

export function IconGenerator() {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSvg, setGeneratedSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const svg = await generateIcon(description);
      setGeneratedSvg(svg);
    } catch (err) {
      setError('Failed to generate icon. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Describe your icon</Label>
          <Input
            id="description"
            placeholder="e.g., a car driving on a road, a human figure waving"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={isLoading}>
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
        </div>
      )}
    </Card>
  );
} 