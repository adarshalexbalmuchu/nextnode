
import React, { Suspense, lazy, useMemo, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Bell, Activity, FileText } from 'lucide-react';
import { LineChart } from '@/components/ui/chart';
import { useQuery } from '@tanstack/react-query';
import { BlogService } from '@/services/BlogService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface Post {
  author: string;
  category: string;
  content: string;
  cover_image_url: string;
  created_at: string;
  status: string;
  id: string;
  published_at: string;
  slug: string;
  tags: string[];
  title: string;
  updated_at: string;
}

interface QueryError {
  status?: number;
  message: string;
}

// Lazy load only Clock component
const Clock = lazy(() => import('@/components/admin/Clock'));

const LoadingCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>
        <Skeleton className="h-4 w-[150px]" />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[200px] w-full" />
    </CardContent>
  </Card>
);

const StatCard = React.memo(({ title, value, icon: Icon, trend }: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: { value: number; isPositive: boolean };
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className={`text-xs ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
        </p>
      )}
    </CardContent>
  </Card>
));

StatCard.displayName = 'StatCard';

const Dashboard = () => {
  console.log('[Dashboard] Component mounted');
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    console.log('[Dashboard] User state:', { 
      isAuthenticated: !!user,
      email: user?.email,
      authLoading 
    });
  }, [user, authLoading]);

  // Define chart data and options up front to avoid conditional hook calls
  const chartData = useMemo(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Posts',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }), []);

  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  }), []);

  // Fetch posts data with error handling
  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery<Post[], QueryError>({
    queryKey: ['admin-posts'],
    queryFn: async () => {
      try {
        console.log('[Dashboard] Starting to fetch posts');
        const posts = await BlogService.getAllPosts();
        console.log('[Dashboard] Posts fetched:', posts?.length ?? 0);
        return posts;
      } catch (error) {
        console.error('[Dashboard] Error fetching posts:', error);
        // Check if unauthorized and redirect to auth
        if (error instanceof Error && 
           (error.message.includes('Authentication required') || 
            error.message.includes('Insufficient permissions'))) {
          toast.error('Please sign in again');
          navigate('/auth');
        }
        throw error;
      }
    },
    retry: false, // Don't retry on auth errors
  });

  console.log('[Dashboard] Render state:', { postsLoading, postsError, postsCount: posts?.length });

  if (postsLoading) {
    return (
      <AdminLayout>
        <div className="p-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (postsError) {
    return (
      <AdminLayout>
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">Error Loading Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {postsError instanceof Error ? postsError.message : 'Failed to load dashboard data'}
              </p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
              >
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  // Ensure post data is properly typed and handle loading state
  const postsData = posts ?? [];
  const totalPosts = postsData.length;
  const publishedPosts = postsData.filter(post => post.status === 'published').length;
  const draftPosts = postsData.filter(post => post.status === 'draft').length;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Posts"
            value={totalPosts}
            icon={FileText}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Published Posts"
            value={publishedPosts}
            icon={Activity}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Draft Posts"
            value={draftPosts}
            icon={FileText}
            trend={{ value: 4, isPositive: true }}
          />
          <StatCard
            title="Notifications"
            value="0"
            icon={Bell}
            trend={{ value: 0, isPositive: true }}
          />
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Content Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                <LineChart data={chartData} options={chartOptions} />
              </Suspense>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Server Time</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                <Clock />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default React.memo(Dashboard);
