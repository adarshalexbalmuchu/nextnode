
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BlogCard from '@/components/BlogCard';
import CategoryFilter from '@/components/CategoryFilter';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blogPosts';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mounted, setMounted] = useState(false);

  // This effect runs once after component mounts to avoid hydration issues with SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1, 4); // Show only 3 recent posts on homepage

  if (!mounted) {
    return null; // Avoid rendering until after client-side hydration
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Hero />
      
      {/* Featured Article */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Article
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Dive deep into the latest breakthroughs and insights in AI and technology
            </p>
          </div>
          <BlogCard post={featuredPost} featured={true} />
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Insights
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stay updated with our latest articles on AI innovations and technology trends
            </p>
          </div>

          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          {filteredPosts.length > 3 && (
            <div className="mt-12 text-center">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-teal-600 dark:text-teal-400 font-semibold hover:text-teal-700 dark:hover:text-teal-300"
              >
                View all articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No articles found in this category. Check back soon for more content!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-teal-600 dark:bg-teal-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Ahead of the AI Revolution
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Get weekly insights on AI innovations, technology trends, and industry analysis delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:bg-gray-800 dark:text-white dark:border dark:border-gray-600"
            />
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-teal-300">
              Subscribe
            </button>
          </div>
          <p className="text-teal-200 text-sm mt-4">
            Join 10,000+ tech leaders who trust NextNode for AI insights
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
