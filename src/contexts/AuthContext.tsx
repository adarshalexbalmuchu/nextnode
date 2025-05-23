import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Create or update profile when user signs up or signs in
        if (session?.user && (event === 'SIGNED_IN' || event === 'SIGNED_UP')) {
          const { error } = await supabase.from('profiles').upsert({
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata.full_name,
            updated_at: new Date().toISOString(),
          });

          if (error) {
            console.error('Error updating profile:', error);
          }
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Signed in successfully');
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Error signing in');
      console.error('Error signing in:', error);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (error) throw error;
      toast.success('Signed up successfully! You can now sign in.');
      navigate('/auth');
    } catch (error: any) {
      toast.error(error.message || 'Error signing up');
      console.error('Error signing up:', error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, signIn, signUp, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};