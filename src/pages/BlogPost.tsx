
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { toast } from 'sonner';
import BlogCard from '@/components/BlogCard';
import { BlogService } from '@/services/BlogService';
import { useQuery } from '@tanstack/react-query';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => BlogService.getPostBySlug(slug!),
    retry: false
  });
  
  // Handle error by redirecting to 404
  useEffect(() => {
    if (error) {
      navigate('/not-found', { replace: true });
    }
  }, [error, navigate]);
  
  const { data: relatedPosts } = useQuery({
    queryKey: ['related-posts', post?.category],
    queryFn: () => BlogService.getPublishedPosts(),
    enabled: Boolean(post?.category)
  });
  
  const handleShare = (platform: string) => {
    const url = window.location.href;
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${post?.title}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {isLoading ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Skeleton className="h-12 w-3/4 mb-6" />
            <div className="flex items-center space-x-4 mb-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-96 w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
        ) : post && (
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-8 gap-4">
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
              {post.category && (
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                  {post.category}
                </span>
              )}
            </div>
            
            {post.coverImage && (
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-auto rounded-xl object-cover mb-8"
              />
            )}
            
            <div className="prose prose-lg max-w-none">
              {/* This would typically be rendered Markdown content */}
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Share options */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Share2 size={18} /> Share this article
              </h3>
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={20} className="text-blue-600" />
                </button>
                <button 
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={20} className="text-blue-400" />
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={20} className="text-blue-700" />
                </button>
                <button 
                  onClick={() => handleShare('copy')}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="Copy link"
                >
                  <Copy size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Author info */}
            <div className="mt-12 p-6 bg-gray-100 rounded-xl">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-4">
                <div className="h-16 w-16 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl font-bold">
                  {post.author?.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{post.author}</h3>
                  <p className="text-gray-600">
                    Technology analyst and writer specializing in artificial intelligence, machine learning, and emerging tech trends. 
                    With over a decade of experience in the tech industry, providing insights on how AI is transforming businesses and society.
                  </p>
                </div>
              </div>
            </div>
          </article>
        )}
      </main>
      
      {/* Related Articles Section */}
      {!isLoading && post && relatedPosts && (
        <section className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts
                .filter((p: any) => p.id !== post.id && p.category === post.category)
                .slice(0, 3)
                .map((relatedPost: any) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default BlogPost;
