import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Book Appointment', path: '/booking' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="text-xl xl:text-2xl font-bold text-primary">Cyberdoctor</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex xl:items-center xl:space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden xl:flex xl:items-center xl:space-x-4">
          {user && profile ? (
            <>
              {profile.role === 'admin' && (
                <Button variant="outline" asChild>
                  <Link to="/admin">
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Link>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm">
                    <p className="font-medium">{profile.username || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{profile.role}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col space-y-4 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-primary ${
                    isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t">
                {user && profile ? (
                  <div className="space-y-4">
                    <div className="px-2 py-1.5 text-sm">
                      <p className="font-medium">{profile.username || 'User'}</p>
                      <p className="text-xs text-muted-foreground">{profile.role}</p>
                    </div>
                    {profile.role === 'admin' && (
                      <Button variant="outline" className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                        <Link to="/admin">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </Button>
                    )}
                    <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/login">Sign In</Link>
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
