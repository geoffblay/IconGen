import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Payment Cancelled</h1>
        <p className="text-lg text-gray-600">
          Your payment was cancelled. No charges were made to your account.
        </p>
        <div className="pt-4">
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 