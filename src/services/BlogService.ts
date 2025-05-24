import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Post = Database['public']['Tables']['posts']['Row'];
type PostInsert = Database['public']['Tables']['posts']['Insert'];
type PostUpdate = Database['public']['Tables']['posts']['Update'];
type Profile = Database['public']['Tables']['profiles']['Row'];

export interface PostInput {
  title: string;
  content?: string;
  cover_image_url?: string;
  category?: string;
  author: string;
  tags?: string[];
  draft?: boolean;
  published_at?: Date | null;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  tags: string[];
}

export interface ServiceError extends Error {
  status?: number;
  details?: unknown;
}

export const BlogService = {
  // Get all posts (published and drafts) - requires admin access
  getAllPosts: async (): Promise<Post[]> => {
    console.log('[BlogService] Starting getAllPosts');
    try {
      // First check user session
      const session = await supabase.auth.getSession();
      if (!session.data.session?.user) {
        console.error('[BlogService] No authenticated user');
        throw new Error('Authentication required');
      }

      // Then check user role
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.data.session.user.id)
        .single();
      
      if (profileError) {
        console.error('[BlogService] Error fetching profile:', profileError);
        throw new Error('Failed to verify permissions');
      }

      console.log('[BlogService] User role:', profileData?.role);
      
      if (!profileData?.role || !['admin', 'author'].includes(profileData.role)) {
        console.error('[BlogService] Unauthorized role:', profileData?.role);
        throw new Error('Insufficient permissions');
      }

      // Finally fetch posts
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('[BlogService] Error fetching posts:', error);
        throw error;
      }
      
      console.log('[BlogService] Successfully fetched posts:', data?.length ?? 0);
      return data || [];

    } catch (error) {
      console.error('[BlogService] Error in getAllPosts:', error);
      throw error;
    }
  },

  // Get all published posts
  getPublishedPosts: async (): Promise<BlogPost[]> => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('draft', false)
        .not('published_at', 'is', null)
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
      
      return (data as Post[]).map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content || '',
        coverImage: post.cover_image_url || '',
        category: post.category || '',
        author: post.author,
        publishDate: new Date(post.published_at || '').toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        readTime: post.content ? `${Math.ceil(post.content.split(' ').length / 200)} min read` : '0 min read',
        tags: post.tags || [],
      }));
    } catch (error) {
      console.error('Error in getPublishedPosts:', error);
      throw error;
    }
  },
  
  // Get a single post by slug
  getPostBySlug: async (slug: string): Promise<Post | null> => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
    
    return data;
  },
  
  // Create a new post
  createPost: async (post: PostInput): Promise<Post> => {
    const slug = post.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
      
    const insertData: PostInsert = {
      title: post.title,
      slug,
      content: post.content || '',
      cover_image_url: post.cover_image_url,
      category: post.category,
      author: post.author,
      tags: post.tags,
      draft: post.draft !== undefined ? post.draft : true,
      published_at: post.published_at ? post.published_at.toISOString() : null,
    };
    
    const { data, error } = await supabase
      .from('posts')
      .insert(insertData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating post:', error);
      throw error;
    }
    
    return data;
  },
  
  // Update an existing post
  updatePost: async (id: string, post: Partial<PostInput>): Promise<Post> => {
    const updateData: PostUpdate = {
      title: post.title,
      content: post.content,
      cover_image_url: post.cover_image_url,
      category: post.category,
      author: post.author,
      tags: post.tags,
      draft: post.draft,
      published_at: post.published_at ? post.published_at.toISOString() : null,
    };
    
    const { data, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating post:', error);
      throw error;
    }
    
    return data;
  },
  
  // Delete a post
  deletePost: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },
  
  // Upload an image to Supabase Storage
  uploadImage: async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file);
      
    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw uploadError;
    }
    
    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);
      
    return urlData.publicUrl;
  },
};