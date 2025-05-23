import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDashboard from './pages/UserDashboard';
import UserProtectedRoute from './components/UserProtectedRoute';
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load admin routes
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const NewPost = lazy(() => import("./pages/admin/NewPost"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        if (
          typeof error === 'object' &&
          error !== null &&
          'status' in error &&
          (Number((error as { status?: number }).status) === 401 || Number((error as { status?: number }).status) === 403)
        ) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Initialize dark mode from localStorage or system preference
const initializeDarkMode = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    return;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', prefersDark);
};

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

const App = () => {
  useEffect(() => {
    initializeDarkMode();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary>
          <BrowserRouter>
            <AuthProvider>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                  
                  {/* Auth Routes */}
                  <Route path="/auth" element={<Auth />} />
                  
                  {/* Protected Admin Routes */}
                  <Route 
                    path="/admin"
                    element={<ProtectedRoute />}
                  >
                    <Route 
                      index 
                      element={<Navigate to="/admin/dashboard" replace />} 
                    />
                    <Route 
                      path="dashboard" 
                      element={
                        <Suspense fallback={<LoadingFallback />}>
                          <Dashboard />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="new-post" 
                      element={
                        <Suspense fallback={<LoadingFallback />}>
                          <NewPost />
                        </Suspense>
                      } 
                    />
                  </Route>

                  {/* Protected User Dashboard Route */}
                  <Route 
                    path="/user"
                    element={<UserProtectedRoute />} 
                  >
                    <Route index element={<UserDashboard />} />
                  </Route>
                  
                  {/* 404 - Not Found */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AuthProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
