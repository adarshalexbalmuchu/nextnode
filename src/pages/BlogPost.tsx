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
import { useAuth } from '@/contexts/AuthContext';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
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
  
  // Bookmark state
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [bookmarkId, setBookmarkId] = useState<string | null>(null);
  // Comments state
  const [comments, setComments] = useState<Array<{ id: string; user_id: string; content: string; created_at: string; user_email: string }>>([]);
  const [commentText, setCommentText] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  // Edit comment state
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState('');

  // Fetch bookmark status and comments
  useEffect(() => {
    if (!user || !post?.id) return;
    // Check if bookmarked
    fetch(`/rest/v1/bookmarks?user_id=eq.${user.id}&post_id=eq.${post.id}`, {
      headers: { 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY }
    })
      .then(res => res.json())
      .then((data) => {
        if (data.length > 0) {
          setIsBookmarked(true);
          setBookmarkId(data[0].id);
        } else {
          setIsBookmarked(false);
          setBookmarkId(null);
        }
      });
    // Fetch comments
    fetch(`/rest/v1/comments?post_id=eq.${post.id}&select=id,user_id,content,created_at,users(email)&order=created_at.desc`, {
      headers: { 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY }
    })
      .then(res => res.json())
      .then((data: Array<{ id: string; user_id: string; content: string; created_at: string; users?: { email?: string } }>) => {
        setComments(data.map((c) => ({
          id: c.id,
          user_id: c.user_id,
          content: c.content,
          created_at: c.created_at,
          user_email: c.users?.email || 'User',
        })));
      });
  }, [user, post?.id]);

  // Handle bookmark toggle
  const handleBookmark = async () => {
    if (!user || !post?.id) return;
    if (isBookmarked && bookmarkId) {
      // Remove bookmark
      await fetch(`/rest/v1/bookmarks?id=eq.${bookmarkId}`, {
        method: 'DELETE',
        headers: { 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY }
      });
      setIsBookmarked(false);
      setBookmarkId(null);
      toast.success('Removed from bookmarks');
    } else {
      // Add bookmark
      const res = await fetch(`/rest/v1/bookmarks`, {
        method: 'POST',
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({ user_id: user.id, post_id: post.id })
      });
      const data = await res.json();
      setIsBookmarked(true);
      setBookmarkId(data[0]?.id);
      toast.success('Bookmarked!');
    }
  };

  // Handle comment submit
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !post?.id || !commentText.trim()) return;
    setCommentLoading(true);
    await fetch(`/rest/v1/comments`, {
      method: 'POST',
      headers: {
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({ user_id: user.id, post_id: post.id, content: commentText.trim() })
    });
    setCommentText('');
    setCommentLoading(false);
    // Refresh comments
    fetch(`/rest/v1/comments?post_id=eq.${post.id}&select=id,user_id,content,created_at,users(email)&order=created_at.desc`, {
      headers: { 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY }
    })
      .then(res => res.json())
      .then((data: Array<{ id: string; user_id: string; content: string; created_at: string; users?: { email?: string } }>) => {
        setComments(data.map((c) => ({
          id: c.id,
          user_id: c.user_id,
          content: c.content,
          created_at: c.created_at,
          user_email: c.users?.email || 'User',
        })));
      });
    toast.success('Comment added!');
  };

  // Edit comment handler
  const handleEditComment = (commentId: string, currentText: string) => {
    setEditingCommentId(commentId);
    setEditCommentText(currentText);
  };

  const handleEditCommentSave = async (commentId: string) => {
    if (!editCommentText.trim()) return;
    await fetch(`/rest/v1/comments?id=eq.${commentId}`, {
      method: 'PATCH',
      headers: {
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({ content: editCommentText.trim() })
    });
    setEditingCommentId(null);
    setEditCommentText('');
    // Refresh comments
    fetch(`/rest/v1/comments?post_id=eq.${post.id}&select=id,user_id,content,created_at,users(email)&order=created_at.desc`, {
      headers: { 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY }
    })
      .then(res => res.json())
      .then((data: Array<{ id: string; user_id: string; content: string; created_at: string; users?: { email?: string } }>) => {
        setComments(data.map((c) => ({
          id: c.id,
          user_id: c.user_id,
          content: c.content,
          created_at: c.created_at,
          user_email: c.users?.email || 'User',
        })));
      });
    toast.success('Comment updated!');
  };

  // Delete comment handler
  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Delete this comment?')) return;
    await fetch(`/rest/v1/comments?id=eq.${commentId}`, {
      method: 'DELETE',
      headers: { 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY }
    });
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    toast.success('Comment deleted!');
  };

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
            
            {/* Bookmark button */}
            {user && (
              <div className="mt-4">
                <button 
                  onClick={handleBookmark}
                  className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${isBookmarked ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                >
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
              </div>
            )}
            {/* Comments section */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-4">Comments</h3>
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-gray-500 text-sm italic">No comments yet. Be the first to comment!</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold">{comment.user_email}</span>
                        <span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</span>
                      </div>
                      {user && comment.user_id === user.id && editingCommentId === comment.id ? (
                        <div className="flex flex-col gap-2">
                          <textarea
                            value={editCommentText}
                            onChange={e => setEditCommentText(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditCommentSave(comment.id)}
                              className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => { setEditingCommentId(null); setEditCommentText(''); }}
                              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-700">{comment.content}</p>
                          {user && comment.user_id === user.id && (
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => handleEditComment(comment.id, comment.content)}
                                className="text-xs text-blue-600 hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="text-xs text-red-500 hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
              {/* Comment form */}
              {user && (
                <form onSubmit={handleCommentSubmit} className="mt-6">
                  <textarea 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none h-24"
                    placeholder="Add a comment..."
                    required
                  ></textarea>
                  <button 
                    type="submit"
                    className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold transition-all hover:bg-teal-700 flex items-center gap-2"
                    disabled={commentLoading}
                  >
                    {commentLoading ? 'Posting comment...' : 'Post Comment'}
                  </button>
                </form>
              )}
              {!user && (
                <div className="text-gray-500 mt-4">Sign in to comment.</div>
              )}
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
                .filter((p: import('@/services/BlogService').BlogPost) => p.id !== post.id && p.category === post.category)
                .slice(0, 3)
                .map((relatedPost: import('@/services/BlogService').BlogPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Bookmark and Comments Section */}
      {post && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {/* Bookmark Button */}
          {user && (
            <button
              onClick={handleBookmark}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors mb-6 ${isBookmarked ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-700 hover:bg-yellow-200'}`}
            >
              {isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
            </button>
          )}

          {/* Comments Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Comments</h3>
            {user ? (
              <form onSubmit={handleCommentSubmit} className="flex flex-col gap-2 mb-6">
                <textarea
                  className="border rounded px-3 py-2 w-full min-h-[60px]"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="self-end px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                  disabled={commentLoading}
                >
                  {commentLoading ? 'Posting...' : 'Post Comment'}
                </button>
              </form>
            ) : (
              <div className="text-gray-500 mb-6">Sign in to comment.</div>
            )}
            {comments.length === 0 ? (
              <div className="text-gray-400">No comments yet.</div>
            ) : (
              <ul className="space-y-4">
                {comments.map((c) => (
                  <li key={c.id} className="bg-gray-50 dark:bg-gray-800 rounded px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-teal-700 dark:text-teal-300">{c.user_email}</span>
                      <span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleString()}</span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-200 text-sm">{c.content}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default BlogPost;
