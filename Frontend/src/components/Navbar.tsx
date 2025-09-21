import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sprout, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = user ? [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/schemes', label: 'Schemes' },
    { href: '/weather', label: 'Weather' },
  ] : [
    { href: '/', label: 'Home' },
    { href: '/login', label: 'Login' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">FarmAssist</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {user && (
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={signOut}
                  className="text-destructive hover:text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        isActive(item.href) ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  {user && (
                    <div className="pt-4 border-t space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-destructive hover:text-destructive"
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;