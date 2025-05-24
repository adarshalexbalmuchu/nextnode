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

// Supabase DB types for posts and categories
interface PostRow {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  cover_image_url: string | null;
  category_id: string | null;
  author_id: string;
  tags: string[] | null;
  status: string;
  published_at: string | null;
  created_at: string;
  // joined fields
  author?: { full_name?: string };
  category?: { name?: string };
}

interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export const BlogService = {
  // Get all posts (published and drafts) - requires admin access
  getAllPosts: async (): Promise<PostRow[]> => {
    try {
      // First check user session
      const session = await supabase.auth.getSession();
      if (!session.data.session?.user) {
        throw new Error('Authentication required');
      }

      // Then check user role using the security definer function
      const { data: userRole, error: roleError } = await supabase
        .rpc('get_user_role', { user_id: session.data.session.user.id });
      
      if (roleError) {
        throw new Error('Error fetching user permissions');
      }
      
      // Allow admin and author roles
      if (!userRole || !['admin', 'author'].includes(userRole)) {
        throw new Error('Insufficient permissions - admin or author role required');
      }

      // Finally fetch posts with author and category info
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:users(full_name),
          category:categories(name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return (data as PostRow[]) || [];

    } catch (error) {
      throw error;
    }
  },

  // Get all published posts
  getPublishedPosts: async (): Promise<BlogPost[]> => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`*, author:users(full_name), category:categories(name)`)
        .eq('status', 'published')
        .not('published_at', 'is', null)
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return (data as PostRow[]).map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content || '',
        excerpt: post.excerpt || '',
        coverImage: post.cover_image_url || '',
        category: post.category?.name || '',
        author: post.author?.full_name || 'Unknown',
        publishDate: post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric',
        }) : '',
        readTime: post.content ? `${Math.ceil(post.content.split(' ').length / 200)} min read` : '0 min read',
        tags: post.tags || [],
        status: post.status,
      }));
    } catch (error) {
      throw error;
    }
  },
  
  // Get a single post by slug
  getPostBySlug: async (slug: string): Promise<BlogPost | null> => {
    // Try to fetch by slug, fallback to id if not found
    let { data, error } = await supabase
      .from('posts')
      .select(`*, author:users(full_name), category:categories(name)`)
      .eq('slug', slug)
      .single();

    // If not found and slug looks like a UUID, try by id
    if ((error && error.code === 'PGRST116') || (!data && /^[0-9a-fA-F-]{36}$/.test(slug))) {
      ({ data, error } = await supabase
        .from('posts')
        .select(`*, author:users(full_name), category:categories(name)`)
        .eq('id', slug)
        .single());
    }

    if (error || !data) {
      return null;
    }

    const post = data as PostRow;
    // Map to BlogPost shape
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content || '',
      excerpt: post.excerpt || '',
      coverImage: post.cover_image_url || '',
      category: post.category?.name || '',
      author: post.author?.full_name || 'Unknown',
      publishDate: post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      }) : '',
      readTime: post.content ? `${Math.ceil(post.content.split(' ').length / 200)} min read` : '0 min read',
      tags: post.tags || [],
      status: post.status,
    };
  },
  
  // Create a new post
  createPost: async (post: PostInput): Promise<PostRow> => {
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
      throw error;
    }
    
    return data as PostRow;
  },
  
  // Update an existing post
  updatePost: async (id: string, post: Partial<PostInput>): Promise<PostRow> => {
    const updateData: Partial<PostRow> = {
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
      throw error;
    }
    
    return data as PostRow;
  },
  
  // Delete a post
  deletePost: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
      
    if (error) {
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
        throw error;
      }
      
      return (data as CategoryRow[]).map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description || undefined,
      }));
    } catch (error) {
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
      throw uploadError;
    }
    
    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);
      
    return urlData.publicUrl;
  },
};
