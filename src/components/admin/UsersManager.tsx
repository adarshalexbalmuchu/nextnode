
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Crown, Shield, User } from 'lucide-react';
import { toast } from 'sonner';

const UsersManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`email.ilike.%${searchTerm}%,full_name.ilike.%${searchTerm}%`);
      }

      const { data: profiles, error } = await query;
      if (error) throw error;

      // Get user roles separately using RPC function
      const usersWithRoles = await Promise.all(
        (profiles || []).map(async (profile) => {
          try {
            const { data: role } = await supabase.rpc('get_user_role', { 
              user_id: profile.id 
            });
            return { ...profile, role: role || 'user' };
          } catch (error) {
            console.error('Error getting role for user:', profile.id, error);
            return { ...profile, role: 'user' };
          }
        })
      );

      return usersWithRoles;
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: string }) => {
      // Since update_user_role doesn't exist, we'll update the profiles table directly
      // This assumes the role is stored in the profiles table
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('User role updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update user role: ' + error.message);
    },
  });

  const handleRoleChange = (userId: string, newRole: string) => {
    updateRoleMutation.mutate({ userId, newRole });
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: { class: 'bg-red-500/20 text-red-400 border-red-500/50', icon: Crown },
      moderator: { class: 'bg-blue-500/20 text-blue-400 border-blue-500/50', icon: Shield },
      user: { class: 'bg-gray-500/20 text-gray-400 border-gray-500/50', icon: User },
    };
    return variants[role as keyof typeof variants] || variants.user;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-navy-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Users Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-navy-800/50 border-gray-700"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user) => {
                    const role = user.role || 'user';
                    const roleConfig = getRoleBadge(role);
                    const RoleIcon = roleConfig.icon;
                    
                    return (
                      <TableRow key={user.id} className="border-gray-700">
                        <TableCell className="font-medium">
                          {user.full_name || 'Unknown User'}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge className={roleConfig.class}>
                            <RoleIcon className="w-3 h-3 mr-1" />
                            {role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={role}
                            onValueChange={(newRole) => handleRoleChange(user.id, newRole)}
                          >
                            <SelectTrigger className="w-32 bg-navy-800/50 border-gray-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="moderator">Moderator</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManager;
