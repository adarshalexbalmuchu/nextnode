
import React from 'react';
import { Search, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/28434454-94ec-467d-9440-689c1e5c6005.png" 
              alt="NextNode Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
              AI Innovations
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
              Technology News
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
              Industry Insights
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
          </nav>

          {/* Search and Admin */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-teal-600 transition-colors">
              <Search size={20} />
            </button>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
              <User size={16} />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
