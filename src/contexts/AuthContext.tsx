
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { debounce } from '@/utils/debounce';

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

  // Memoize profile update function
  const updateUserProfile = useCallback(async (session: Session) => {
    console.log('[Auth] Updating user profile for:', session.user.email);
    try {
      // First check if profile exists using raw query to avoid type issues
      const { data: existingProfile, error: fetchError } = await supabase
        .rpc('get_user_role', { user_id: session.user.id })
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('[Auth] Error fetching profile:', fetchError);
        return;
      }

      // Use raw SQL approach to avoid type conflicts
      const { error } = await supabase
        .from('users' as any)
        .upsert({
          id: session.user.id,
          email: session.user.email,
          full_name: session.user.user_metadata.full_name,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('[Auth] Error updating profile:', error);
        toast.error('Error updating profile');
      } else {
        console.log('[Auth] Profile updated successfully');
      }
    } catch (error) {
      console.error('[Auth] Unexpected error updating profile:', error);
    }
  }, []);

  // Debounce the profile update
  const debouncedProfileUpdate = useMemo(
    () => debounce(async (session: Session) => {
      await updateUserProfile(session);
      setLoading(false);
    }, 100),
    [updateUserProfile]
  );

  // Memoize auth state handler
  const handleAuthStateChange = useCallback(async (event: string, session: Session | null) => {
    console.log('[Auth] Auth state changed:', event, session?.user?.email);
    
    setSession(session);
    setUser(session?.user ?? null);

    if (session?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
      await debouncedProfileUpdate(session);
    } else {
      setLoading(false);
    }
  }, [debouncedProfileUpdate]);

  useEffect(() => {
    console.log('[Auth] Setting up auth state listener');
    
    let mounted = true;
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          await handleAuthStateChange(event, session);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (mounted) {
        console.log('[Auth] Existing session check:', session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await debouncedProfileUpdate(session);
        } else {
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      console.log('[Auth] Cleaning up auth state listener');
      subscription.unsubscribe();
    };
  }, [handleAuthStateChange, debouncedProfileUpdate]);

  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
      toast.success('Signed in successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Error signing in');
        console.error('Error signing in:', error);
      } else {
        toast.error('Error signing in');
        console.error('Error signing in:', error);
      }
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!email || !password || !fullName) {
      toast.error('All fields are required');
      return;
    }
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });
      if (error) throw error;
      toast.success('Signed up successfully! Please check your email for confirmation.');
      navigate('/auth');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error('Error signing up:', error);
      } else {
        toast.error('An unexpected error occurred during sign up');
        console.error('Error signing up:', error);
      }
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
      toast.success('Signed out successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Error signing out');
        console.error('Error signing out:', error);
      } else {
        toast.error('Error signing out');
        console.error('Error signing out:', error);
      }
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
