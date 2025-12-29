import { Link, useLocation, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, MessageSquare, Settings, Users, Home, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const adminNavigation = [
  { name: 'Dashboard', path: '/admin', icon: Home },
  { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
  { name: 'Reviews', path: '/admin/reviews', icon: MessageSquare },
  { name: 'Content', path: '/admin/content', icon: Settings },
  { name: 'Users', path: '/admin/users', icon: Users },
];

export default function AdminLayout() {
  const location = useLocation();
  const { profile } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  if (!profile || profile.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop Sidebar */}
      <aside className="hidden xl:flex xl:flex-col xl:w-64 xl:shrink-0 border-r bg-muted/30">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
          <p className="text-sm text-muted-foreground mt-1">Cyberdoctor</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {adminNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/">Back to Website</Link>
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="xl:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold text-primary">Admin Panel</h2>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <div className="py-4">
                <h2 className="text-xl font-bold text-primary mb-1">Admin Panel</h2>
                <p className="text-sm text-muted-foreground">Cyberdoctor</p>
              </div>
              <nav className="space-y-2 mt-6">
                {adminNavigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-6 pt-6 border-t">
                <Button variant="outline" className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                  <Link to="/">Back to Website</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 xl:flex-1 w-full">
        <div className="xl:p-8 p-4 mt-16 xl:mt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
