
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Search, Menu, Zap, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force dark mode on component mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-navy/95 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-primary/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-navy" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <span className="text-xl sm:text-2xl font-display font-bold text-white group-hover:scale-105 transition-transform duration-300">
              NextNode
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-gray-300 hover:text-primary'
                }`}
              >
                {item.name}
                <span 
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 group-hover:text-primary transition-colors duration-300" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-48 lg:w-64 bg-navy-800/50 border-gray-700 hover:border-primary/50 focus:border-primary transition-all duration-300 text-gray-100 placeholder:text-gray-500"
              />
            </div>

            <Button className="bg-gradient-to-r from-primary to-accent text-navy hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group font-semibold">
              <span>Subscribe</span>
              <Zap className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform duration-300" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-gray-300 hover:text-primary hover:bg-navy-800">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-navy border-primary/20">
                <div className="flex flex-col space-y-6 mt-6">
                  
                  {/* Mobile Logo */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-navy" />
                      </div>
                      <span className="text-xl font-display font-bold text-white">NextNode</span>
                    </div>
                  </div>

                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      type="search"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-navy-800/50 border-gray-700 text-gray-100 placeholder:text-gray-500"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-lg font-medium transition-colors duration-300 ${
                          isActive(item.href)
                            ? 'text-primary'
                            : 'text-gray-300 hover:text-primary'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile CTA */}
                  <div className="pt-4 border-t border-gray-700">
                    <Button className="w-full bg-gradient-to-r from-primary to-accent text-navy font-semibold">
                      Subscribe to Newsletter
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
