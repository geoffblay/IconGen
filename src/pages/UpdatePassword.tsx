import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(password);
    try {
        await supabase.auth.updateUser({
            password: password,
        })
    } catch (error) {
        console.error(error);
    }
    navigate('/account');
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
                        value={password} onChange={(e) => setPassword(e.target.value)} 
                    />
                    <Button type="submit" className="w-full">Change password</Button>
                </div>
            </form>
        </Card>
    </div>
  );
}