import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getProfiles, updateProfile } from '@/db/api';
import type { Profile, UserRole } from '@/types/types';
import { Users, Shield } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getProfiles();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id: string, role: UserRole) => {
    try {
      await updateProfile(id, { role });
      setUsers(users.map((user) => (user.id === id ? { ...user, role } : user)));
      toast({
        title: 'Success',
        description: 'User role updated',
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user role',
        variant: 'destructive',
      });
    }
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground';
  };

  const adminCount = users.filter((u) => u.role === 'admin').length;
  const userCount = users.filter((u) => u.role === 'user').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-2">Manage user roles and permissions</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="default">{adminCount} Admins</Badge>
          <Badge variant="secondary">{userCount} Users</Badge>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-16 w-full bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : users.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No users yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-xl flex items-center gap-2">
                      {user.username || 'Unknown User'}
                      {user.role === 'admin' && <Shield className="h-5 w-5 text-primary" />}
                    </CardTitle>
                    <div className="flex flex-col xl:flex-row xl:items-center gap-2 text-sm text-muted-foreground">
                      {user.email && <span>{user.email}</span>}
                      {user.phone && (
                        <>
                          {user.email && <span className="hidden xl:inline">•</span>}
                          <span>{user.phone}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                    <Select
                      value={user.role}
                      onValueChange={(value) => handleRoleChange(user.id, value as UserRole)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Joined: {new Date(user.created_at).toLocaleDateString()}</span>
                  <span>ID: {user.id.slice(0, 8)}...</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
