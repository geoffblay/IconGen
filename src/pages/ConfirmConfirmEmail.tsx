import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';

export default function ConfirmConfirmEmail() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const confirmationUrl = searchParams.get('confirmation_url');
      if (!confirmationUrl) {
        throw new Error('Invalid confirmation URL');
      }
      console.log('confirmationUrl', confirmationUrl);
      // navigate(confirmationUrl);
      // go to the confirmation url
      window.location.href = confirmationUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process confirm email');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8 bg-transparent border-2 border-gray-950">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Confirm your email</h2>
          <p className="mt-2 text-gray-600">Click the button below to proceed with confirm email</p>
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}

        <Button
          onClick={handleConfirm}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Confirm Email'}
        </Button>
      </Card>
    </div>
  );
} 