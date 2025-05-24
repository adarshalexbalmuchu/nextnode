import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from './ui/skeleton';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[ProtectedRoute] Mount with state:', { loading, user: !!user });
    if (!loading && !user) {
      console.log('[ProtectedRoute] No user found, redirecting to auth...');
      toast.error('Please sign in to access this page');
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  console.log('[ProtectedRoute] Status:', { 
    loading, 
    isAuthenticated: !!user, 
    userEmail: user?.email 
  });

  if (loading) {
    console.log('[ProtectedRoute] Still loading auth state...');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md space-y-4 p-8">
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-8 w-1/2 mx-auto" />
        </div>
      </div>
    );
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
