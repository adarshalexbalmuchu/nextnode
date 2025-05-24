import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <span className="font-extrabold text-3xl tracking-tight text-teal-400 drop-shadow-lg" style={{letterSpacing: '0.05em', fontFamily: 'Montserrat, Arial, sans-serif'}}>
                NextNode
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md text-lg font-medium">
              NextNode is your premier destination for AI innovations, technology insights, 
              and industry analysis. Stay informed about the future of technology.
            </p>
            {/* Newsletter Subscribe Form */}
            <form
              className="mt-6 flex flex-col sm:flex-row items-start sm:items-end gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                  alert('Please enter a valid email address.');
                  return;
                }
                // Use fetch to insert into Supabase REST endpoint for newsletter_subscribers
                const res = await fetch('/rest/v1/newsletter_subscribers', {
                  method: 'POST',
                  headers: {
                    'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation',
                  },
                  body: JSON.stringify({ email })
                });
                if (res.status === 409) {
                  alert('You are already subscribed!');
                  return;
                }
                if (!res.ok) {
                  alert('Subscription failed. Please try again later.');
                  return;
                }
                alert('Thank you for subscribing!');
                form.reset();
              }}
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 w-full sm:w-auto"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-teal-500 hover:bg-teal-600 text-white font-semibold transition-colors shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/blog?category=AI%20Innovations" className="hover:text-teal-400 transition-colors">AI Innovations</Link></li>
              <li><Link to="/blog?category=Technology%20News" className="hover:text-teal-400 transition-colors">Technology News</Link></li>
              <li><Link to="/blog?category=Industry%20Insights" className="hover:text-teal-400 transition-colors">Industry Insights</Link></li>
              <li><Link to="/blog?category=Machine%20Learning" className="hover:text-teal-400 transition-colors">Machine Learning</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link to="/about#contact" className="hover:text-teal-400 transition-colors">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-teal-400 transition-colors">Terms and Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} NextNode. All rights reserved. Powered by innovation and insight.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
