
import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  tags: string[];
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  if (featured) {
    return (
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 transition-transform">
        <Link to={`/blog/${post.id}`} className="block">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-teal-600 dark:text-teal-400 font-semibold text-sm">FEATURED</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{post.publishDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group transform hover:-translate-y-1 transition-transform">
      <Link to={`/blog/${post.id}`} className="block">
        <div className="relative">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-teal-600 dark:bg-teal-700 text-white px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>{post.publishDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
