
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Eye, MessageSquare } from 'lucide-react';

const DashboardStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [postsResult, usersResult, commentsResult] = await Promise.all([
        supabase.from('posts').select('*', { count: 'exact' }),
        supabase.from('profiles').select('*', { count: 'exact' }),
        supabase.from('comments').select('*', { count: 'exact' })
      ]);

      const publishedPosts = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('status', 'published');

      return {
        totalPosts: postsResult.count || 0,
        publishedPosts: publishedPosts.count || 0,
        totalUsers: usersResult.count || 0,
        totalComments: commentsResult.count || 0,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-navy-800/50 border-gray-700 animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Posts',
      value: stats?.totalPosts || 0,
      description: `${stats?.publishedPosts || 0} published`,
      icon: FileText,
      color: 'text-blue-400'
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      description: 'Registered users',
      icon: Users,
      color: 'text-green-400'
    },
    {
      title: 'Published Posts',
      value: stats?.publishedPosts || 0,
      description: 'Live content',
      icon: Eye,
      color: 'text-purple-400'
    },
    {
      title: 'Comments',
      value: stats?.totalComments || 0,
      description: 'User engagement',
      icon: MessageSquare,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="bg-navy-800/50 border-gray-700 hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p className="text-xs text-gray-400 mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
