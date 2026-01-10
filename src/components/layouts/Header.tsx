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

// Reset navigation to original state
const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
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
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/30 bg-slate-900 backdrop-blur">
      <nav className="container flex h-16 items-center justify-between px-4">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="https://miaoda-conversation-file.s3cdn.medo.dev/user-8k8acfg8q134/conv-8k8ae6le0c8w/20260109/file-8tfbpsf3llog.png" 
            alt="Cyberdoctor Computer & Laptop Service Center" 
            className="h-12 w-auto"
          />
          <span className="text-xl font-bold text-white">CyberDoctor</span>
        </Link>

        {/* Desktop Navigation & Auth Section */}
        <div className="hidden xl:flex xl:items-center xl:space-x-8">
          <div className="flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                  isActive(item.path) ? 'text-cyan-400' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 border-l border-slate-700 pl-6">
            {user && profile ? (
              <>
                {profile.role === 'admin' && (
                  <Button variant="outline" size="sm" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10" asChild>
                    <Link to="/admin">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:text-cyan-400">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-white">
                    <div className="px-2 py-1.5 text-sm">
                      <p className="font-medium text-cyan-400">{profile.username || 'User'}</p>
                      <p className="text-xs text-slate-400 capitalize">{profile.role}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    <DropdownMenuItem onClick={handleSignOut} className="focus:bg-red-500/10 focus:text-red-400 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild className="bg-cyan-600 hover:bg-cyan-500 text-white">
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="xl:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-slate-900 border-l border-cyan-500/30 text-white">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors hover:text-cyan-400 ${
                      isActive(item.path) ? 'text-cyan-400' : 'text-slate-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-slate-800">
                  {user && profile ? (
                    <div className="space-y-4">
                      <div className="px-2 py-1.5 text-sm">
                        <p className="font-medium text-cyan-400">{profile.username || 'User'}</p>
                        <p className="text-xs text-slate-400">{profile.role}</p>
                      </div>
                      <Button variant="ghost" className="w-full justify-start text-red-400 hover:bg-red-400/10" onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full bg-cyan-600 hover:bg-cyan-500" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link to="/login">Sign In</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}