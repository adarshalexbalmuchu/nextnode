import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/useAuth';
import { isAdmin } from '@/utils/isAdmin';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-300 bg-white dark:bg-gray-900 ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <div className="h-12 w-auto font-extrabold text-3xl tracking-tight text-teal-600 dark:text-teal-400 drop-shadow-lg" style={{letterSpacing: '0.05em', fontFamily: 'Montserrat, Arial, sans-serif'}}>
                NextNode
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle()} 
                    asChild
                  >
                    <Link to="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                      {[
                        { title: 'AI Innovations', description: 'The latest breakthroughs in AI technology' },
                        { title: 'Technology News', description: 'Breaking news from the tech industry' },
                        { title: 'Industry Insights', description: 'Analysis and expert perspectives' },
                        { title: 'Machine Learning', description: 'Advances in ML algorithms and applications' },
                      ].map((category) => (
                        <Link
                          key={category.title}
                          to={`/blog?category=${category.title}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{category.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {category.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle()} 
                    asChild
                  >
                    <Link to="/blog">Blog</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle()} 
                    asChild
                  >
                    <Link to="/about">About</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search, Theme Toggle and User/Admin */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-teal-600 transition-colors dark:text-gray-400 dark:hover:text-teal-400">
              <Search size={20} />
            </button>
            
            <ThemeToggle />
            
            {user && isAdmin(user) && (
              <Link
                to="/admin/dashboard"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Admin
              </Link>
            )}
            {user && !isAdmin(user) && (
              <Link
                to="/user"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Account
              </Link>
            )}
            
            {/* Auth Buttons */}
            {!user && (
              <Link
                to="/auth"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Login / Register
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <button
              className="ml-2 md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="pt-2 pb-4 space-y-1 px-4">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            
            <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                Categories
              </h3>
              <div className="mt-2 space-y-1">
                {['AI Innovations', 'Technology News', 'Industry Insights', 'Machine Learning', 'Data Science'].map((category) => (
                  <Link
                    key={category}
                    to={`/blog?category=${category}`}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth Buttons */}
            {!user && (
              <Link
                to="/auth"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-teal-600 hover:bg-teal-700 mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
