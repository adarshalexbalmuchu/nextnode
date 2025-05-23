
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, FileText, Home, LayoutDashboard, LogOut, Menu, Moon, Plus, Settings, Sun, User, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // In a real implementation, we would update the theme here
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className={`min-h-screen bg-gray-100 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <img 
            src="/lovable-uploads/28434454-94ec-467d-9440-689c1e5c6005.png" 
            alt="NextNode" 
            className="h-8 w-auto"
          />
          <button 
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => navigate('/admin/dashboard')}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => navigate('/admin/new-post')}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start"
          >
            <FileText className="mr-2 h-4 w-4" />
            All Posts
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/')}
            >
              <Home className="mr-2 h-4 w-4" />
              View Site
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : ''}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Menu size={20} />
            </button>
            <h1 className="ml-4 text-lg font-medium">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button onClick={toggleTheme} className="text-gray-500 hover:text-gray-700">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                <User size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
