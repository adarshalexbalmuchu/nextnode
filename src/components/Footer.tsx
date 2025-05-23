
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/lovable-uploads/28434454-94ec-467d-9440-689c1e5c6005.png" 
              alt="NextNode Logo" 
              className="h-12 w-auto mb-4 filter brightness-0 invert"
            />
            <p className="text-gray-300 leading-relaxed max-w-md">
              NextNode is your premier destination for AI innovations, technology insights, 
              and industry analysis. Stay informed about the future of technology.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-teal-400 transition-colors">AI Innovations</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Technology News</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Industry Insights</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Machine Learning</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 NextNode. All rights reserved. Powered by innovation and insight.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
