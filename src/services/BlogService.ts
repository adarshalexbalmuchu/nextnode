
import { supabase } from '@/integrations/supabase/client';

export interface PostInput {
  title: string;
  content?: string;
  excerpt?: string;
  cover_image_url?: string;
  category_id?: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'archived';
  published_at?: Date | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  status: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface ServiceError extends Error {
  status?: number;
  details?: unknown;
}

export const BlogService = {
  // Get all posts (published and drafts) - requires admin access
  getAllPosts: async (): Promise<any[]> => {
    console.log('[BlogService] Starting getAllPosts');
    try {
      // First check user session
      const session = await supabase.auth.getSession();
      if (!session.data.session?.user) {
        console.error('[BlogService] No authenticated user');
        throw new Error('Authentication required');
      }

      // Then check user role using the security definer function
      const { data: userRole } = await supabase
        .rpc('get_user_role', { user_id: session.data.session.user.id });
      
      console.log('[BlogService] User role:', userRole);
      
      if (!userRole || !['admin', 'author'].includes(userRole)) {
        console.error('[BlogService] Unauthorized role:', userRole);
        throw new Error('Insufficient permissions');
      }

      // Finally fetch posts with author and category info using raw query
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:users(full_name),
          category:categories(name)
        `)
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
        .select(`
          *,
          author:users(full_name),
          category:categories(name)
        `)
        .eq('status', 'published')
        .not('published_at', 'is', null)
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
      
      return (data as any[]).map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content || '',
        excerpt: post.excerpt || '',
        coverImage: post.cover_image_url || '',
        category: post.category?.name || '',
        author: post.author?.full_name || 'Unknown',
        publishDate: new Date(post.published_at || '').toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        readTime: post.content ? `${Math.ceil(post.content.split(' ').length / 200)} min read` : '0 min read',
        tags: post.tags || [],
        status: post.status,
      }));
    } catch (error) {
      console.error('Error in getPublishedPosts:', error);
      throw error;
    }
  },
  
  // Get a single post by slug
  getPostBySlug: async (slug: string): Promise<any | null> => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users(full_name),
        category:categories(name)
      `)
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
    
    return data;
  },
  
  // Create a new post
  createPost: async (post: PostInput): Promise<any> => {
    const session = await supabase.auth.getSession();
    if (!session.data.session?.user) {
      throw new Error('Authentication required');
    }

    const slug = post.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
      
    const insertData = {
      title: post.title,
      slug,
      content: post.content || '',
      excerpt: post.excerpt || '',
      cover_image_url: post.cover_image_url,
      category_id: post.category_id,
      author_id: session.data.session.user.id,
      tags: post.tags,
      status: post.status || 'draft',
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
  updatePost: async (id: string, post: Partial<PostInput>): Promise<any> => {
    const updateData: any = {
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      cover_image_url: post.cover_image_url,
      category_id: post.category_id,
      tags: post.tags,
      status: post.status,
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

  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
      
      // Ensure we return the correct type by mapping the data
      return (data || []).map((category: any) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description || undefined,
      }));
    } catch (error) {
      console.error('Error in getCategories:', error);
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
