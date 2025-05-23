
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-slate-800 text-white dark:from-slate-800 dark:via-teal-900 dark:to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            AI Innovations & 
            <span className="block text-teal-200">Technology Insights</span>
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stay ahead of the curve with NextNode's comprehensive coverage of artificial intelligence, 
            emerging technologies, and industry-shaping innovations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/blog"
              className="bg-white text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
            >
              Latest Articles
            </Link>
            <div className="flex items-center space-x-3">
              <input 
                type="email" 
                placeholder="Enter your email for updates"
                className="px-4 py-3 rounded-lg text-gray-800 w-64 focus:outline-none focus:ring-2 focus:ring-teal-300 shadow-lg"
              />
              <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-400 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
