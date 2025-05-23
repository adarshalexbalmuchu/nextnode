import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/useAuth';
import { Skeleton } from './ui/skeleton';
import { isAdmin } from '@/utils/isAdmin';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

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

  if (!user) {
    console.log('[ProtectedRoute] No user found, redirecting to auth...');
    return <Navigate to="/auth" replace />;
  }

  // Only allow admin access using Supabase role
  if (!isAdmin(user)) {
    console.log('[ProtectedRoute] User is not admin, redirecting to home...');
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
