import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const { user, credits, creditHistory, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null; // ProtectedRoute will handle the redirect
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'text-green-600';
      case 'usage':
        return 'text-red-600';
      case 'bonus':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      await signOut();

      // call the api/delete-account.ts endpoint
      const response = await fetch('/api/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });

      if (response.ok) {
        alert('Account deleted successfully.');
        window.location.href = '/';
      } else {
        alert('Failed to delete account. Please contact support.');
      }
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account and view your credits</p>
        </div>

        <div className="space-y-6">
          {/* Account Information */}
          <Card className="p-6 bg-transparent border-2 border-gray-950">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 text-gray-900">{user.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Created</label>
                <div className="mt-1 text-gray-900">
                  {new Date(user.created_at || '').toLocaleDateString()}
                </div>
              </div>
              <div>
                <Button
                  className="bg-red-600"
                  onClick={handleDeleteAccount} 
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>

          {/* Credit Balance */}
          <Card className="p-6 bg-transparent border-2 border-gray-950">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Credit Balance</h2>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-gray-900">{credits}</span>
              <span className="text-gray-600">credits</span>
            </div>
            <div className="mt-4">
              <Button onClick={() => {
                navigate('/');
                // Use setTimeout to ensure the navigation completes before scrolling
                setTimeout(() => {
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}>
                Buy Credits
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 bg-transparent border-2 border-gray-950">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            {creditHistory.length > 0 ? (
              <div className="space-y-4">
                {creditHistory.map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{formatDate(transaction.created_at)}</p>
                    </div>
                    <span className={`font-medium ${getTransactionColor(transaction.type)}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-600">
                No recent activity
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
} 