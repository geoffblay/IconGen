import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface CreditTransaction {
  id: string;
  amount: number;
  type: 'purchase' | 'usage' | 'bonus';
  description: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  credits: number;
  creditHistory: CreditTransaction[];
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  addCredits: (amount: number, type: 'purchase' | 'usage' | 'bonus', description: string) => Promise<void>;
  useCredits: (amount: number, description: string) => Promise<boolean>;
  refreshCredits: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(0);
  const [creditHistory, setCreditHistory] = useState<CreditTransaction[]>([]);

  const fetchUserCredits = async (userId: string) => {
    try {
      // Get current balance
      const { data: balanceData, error: balanceError } = await supabase
        .rpc('get_user_credit_balance', { p_user_id: userId });
      console.log('Balance data:', balanceData);

      if (balanceError) throw balanceError;
      setCredits(balanceData || 0);

      // Get credit history
      const { data: historyData, error: historyError } = await supabase
        .from('credits')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (historyError) throw historyError;
      setCreditHistory(historyData || []);
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  useEffect(() => {
    // Check active sessions and sets the user
    console.log('Checking active session...');
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('Session check result:', { session, error });
      setUser(session?.user ?? null);
      if (session?.user) {
        console.log('User found, fetching credits for:', session.user.id);
        fetchUserCredits(session.user.id);
      }
      setLoading(false);
    });

    // Listen for changes on auth state
    console.log('Setting up auth state listener...');
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', { event, session });
      setUser(session?.user ?? null);
      if (session?.user) {
        console.log('User authenticated, fetching credits for:', session.user.id);
        fetchUserCredits(session.user.id);
      } else {
        console.log('No user session, resetting credits');
        setCredits(0);
        setCreditHistory([]);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('Attempting sign in for:', email);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log('Sign in result:', { data, error });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    console.log('Attempting sign up for:', email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: import.meta.env.FRONTEND_URL + '/login',
      },
    });
    console.log('Sign up result:', { data, error });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: import.meta.env.FRONTEND_URL + '/update-password',
    });
    if (error) throw error;
  };

  const addCredits = async (amount: number, type: 'purchase' | 'usage' | 'bonus', description: string) => {
    if (!user) throw new Error('User must be logged in');

    console.log('user:', user);
    const session = await supabase.auth.getSession();
    console.log('session:', session);


    const { error } = await supabase
      .from('credits')
      .insert([
        {
          user_id: user.id,
          amount,
          type,
          description,
        },
      ]);

    if (error) throw error;
    await refreshCredits();
  };

  const useCredits = async (amount: number, description: string): Promise<boolean> => {
    if (!user) throw new Error('User must be logged in');
    if (credits < amount) return false;

    try {
      await addCredits(-amount, 'usage', description);
      return true;
    } catch (error) {
      console.error('Error using credits:', error);
      return false;
    }
  };

  const refreshCredits = async () => {
    if (user) {
      await fetchUserCredits(user.id);
    }
  };

  const value = {
    user,
    loading,
    credits,
    creditHistory,
    signIn,
    signUp,
    signOut,
    resetPassword,
    addCredits,
    useCredits,
    refreshCredits,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 