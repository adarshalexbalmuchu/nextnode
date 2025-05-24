
import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Bell, FileText, Home, LayoutDashboard, LogOut, 
  Menu, Moon, Plus, Settings, Sun, User, X 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = React.memo(({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, user, loading } = useAuth();

  // Memoize menu items
  const menuItems = useMemo(() => [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <Plus size={20} />, label: 'New Post', path: '/admin/new-post' },
    { icon: <Home size={20} />, label: 'View Site', path: '/' },
  ], []);

  // Memoize handlers
  const handleLogout = useCallback(async () => {
    try {
      console.log('[AdminLayout] Signing out...');
      await signOut();
    } catch (error) {
      console.error('[AdminLayout] Error signing out:', error);
    }
  }, [signOut]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const toggleTheme = useCallback(() => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  }, []);

  const handleNavigation = useCallback((path: string) => {
    console.log('[AdminLayout] Navigating to:', path);
    navigate(path);
  }, [navigate]);

  // Memoize the sidebar content
  const sidebarContent = useMemo(() => (
    <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Admin Panel</h2>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden"
        >
          <X size={20} />
        </Button>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? "secondary" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <User size={20} />
            <span className="font-medium">{user?.email}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
        <Button 
          variant="destructive" 
          className="w-full gap-2"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          Sign Out
        </Button>
      </div>
    </div>
  ), [menuItems, user?.email, handleLogout, handleNavigation, toggleSidebar, toggleTheme, darkMode, location.pathname]);

  if (loading) {
    console.log('[AdminLayout] Showing loading state');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {sidebarContent}
      </aside>

      {/* Main content */}
      <div className={`transition-margin duration-300 ${
        sidebarOpen ? 'md:ml-64' : 'ml-0'
      }`}>
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="px-4 py-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings size={20} />
              </Button>
            </div>
          </div>
        </header>

        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
});

AdminLayout.displayName = 'AdminLayout';

export default AdminLayout;
