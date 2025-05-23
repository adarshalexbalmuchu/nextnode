
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/data/blogPosts';

// Type for creating and updating posts
export interface PostInput {
  title: string;
  content?: string;
  excerpt?: string;
  cover_image_url?: string;
  category?: string;
  author: string;
  tags?: string[];
  draft?: boolean;
  published_at?: Date | null;
}

export const BlogService = {
  // Get all published posts
  getPublishedPosts: async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('draft', false)
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
    
    return data.map((post: any) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt || '',
      coverImage: post.cover_image_url || '',
      category: post.category || '',
      author: post.author,
      publishDate: new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      readTime: '5 min read', // This would be calculated based on content length
      tags: post.tags || [],
    }));
  },
  
  // Get all posts (including drafts) for admin
  getAllPosts: async (): Promise<any[]> => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
    
    return data;
  },
  
  // Get a single post by slug
  getPostBySlug: async (slug: string): Promise<any> => {
    let query = supabase.from('posts').select('*').eq('slug', slug);
    
    const { data, error } = await query.single();
    
    if (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
    
    return {
      ...data,
      publishDate: new Date(data.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      readTime: '5 min read', // This would be calculated based on content length
      coverImage: data.cover_image_url,
    };
  },
  
  // Create a new post
  createPost: async (post: PostInput): Promise<any> => {
    // Generate a slug from the title
    const slug = post.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
      
    const { data, error } = await supabase.from('posts').insert([
      {
        title: post.title,
        slug,
        content: post.content || '',
        cover_image_url: post.cover_image_url || '',
        category: post.category || '',
        author: post.author,
        tags: post.tags || [],
        draft: post.draft !== undefined ? post.draft : true,
        published_at: post.published_at || null,
      },
    ]).select();
    
    if (error) {
      console.error('Error creating post:', error);
      throw error;
    }
    
    return data[0];
  },
  
  // Update an existing post
  updatePost: async (id: string, post: Partial<PostInput>): Promise<any> => {
    const { data, error } = await supabase
      .from('posts')
      .update(post)
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Error updating post:', error);
      throw error;
    }
    
    return data[0];
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
    const filePath = `${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);
      
    if (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
    
    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);
      
    return urlData.publicUrl;
  },
};
