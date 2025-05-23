
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blogPosts';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { toast } from 'sonner';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<any>(null);
  
  // Simulate loading and fetch blog post
  useEffect(() => {
    setTimeout(() => {
      const foundPost = blogPosts.find(post => post.id === slug);
      if (foundPost) {
        setPost(foundPost);
      } else {
        navigate('/not-found', { replace: true });
      }
      setIsLoading(false);
    }, 800); // Simulate loading delay
  }, [slug, navigate]);
  
  const handleShare = (platform: string) => {
    const url = window.location.href;
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${post.title}`, '_blank');
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
              <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                {post.category}
              </span>
            </div>
            
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-auto rounded-xl object-cover mb-8"
            />
            
            <div className="prose prose-lg max-w-none">
              {/* This would typically be rendered Markdown content */}
              <p className="text-gray-800 leading-relaxed mb-4">
                {post.excerpt}
              </p>
              
              <p className="text-gray-800 leading-relaxed mb-4">
                The world of artificial intelligence is evolving at an unprecedented pace. Every day, researchers and engineers are pushing the boundaries of what AI systems can do, how they learn, and how they interact with humans. This article explores the cutting-edge innovations in AI that are shaping our future.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">The Evolution of Large Language Models</h2>
              
              <p className="text-gray-800 leading-relaxed mb-4">
                Large Language Models (LLMs) have come a long way since their inception. From GPT-1 to the latest models, we've seen tremendous improvements in capabilities, understanding, and reasoning. These models can now perform tasks that seemed impossible just a few years ago.
              </p>
              
              <p className="text-gray-800 leading-relaxed mb-4">
                One of the most exciting developments is the ability of these models to understand and generate human language with remarkable accuracy. They can write essays, answer questions, summarize long documents, translate between languages, and even create creative content like poetry and fiction.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Multimodal AI: Beyond Text</h2>
              
              <p className="text-gray-800 leading-relaxed mb-4">
                The future of AI is multimodal – systems that can understand and generate content across multiple formats, including text, images, audio, and video. This represents a significant leap forward in creating AI that can interact with the world more like humans do.
              </p>
              
              <p className="text-gray-800 leading-relaxed mb-4">
                Multimodal models can describe what they see in images, generate images from text descriptions, understand and transcribe spoken language, and even create videos from text prompts. This versatility opens up new possibilities for applications in areas like healthcare, education, entertainment, and more.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Conclusion: The Road Ahead</h2>
              
              <p className="text-gray-800 leading-relaxed mb-4">
                As AI continues to evolve, we can expect even more groundbreaking innovations in the coming years. From more capable language models to increasingly sophisticated multimodal systems, the future of AI is bright with possibility.
              </p>
              
              <p className="text-gray-800 leading-relaxed mb-4">
                But with these advances come important questions about ethics, regulation, and responsible use. As we push the boundaries of what AI can do, we must also ensure that we're developing these technologies in ways that benefit humanity and mitigate potential risks.
              </p>
            </div>
            
            {/* Tags */}
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
                  {post.author.split(' ').map((n: string) => n[0]).join('')}
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
      {!isLoading && post && (
        <section className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 3)
                .map(relatedPost => (
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
