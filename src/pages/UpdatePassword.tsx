import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const token = searchParams.get('token');
      
      if (token) {
        // If we have a token, use it to update the password
        const { error } = await supabase.auth.updateUser({
          password: password,
        });
        if (error) throw error;
      } else {
        // If no token, this is a regular password update
        const { error } = await supabase.auth.updateUser({
          password: password,
        });
        if (error) throw error;
      }

      navigate('/account');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update password');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen mt-20">
      <Card className="w-full max-w-md p-8 bg-transparent border-2 border-gray-950">
        <h1 className="text-2xl font-bold">Change your password</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <Input 
              type="password" 
              id="password" 
              className="border-0 border-b-2 border-gray-950 shadow-none rounded-none disabled:opacity-100 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Change password'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}