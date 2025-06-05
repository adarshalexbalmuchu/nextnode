
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface PostEditorProps {
  post?: any;
  onClose: () => void;
}

const PostEditor = ({ post, onClose }: PostEditorProps) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    status: 'draft',
    category: 'General',
    image_url: '',
    tags: '',
  });
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        status: post.status || 'draft',
        category: post.category || 'General',
        image_url: post.image_url || '',
        tags: post.tags ? post.tags.join(', ') : '',
      });
    }
  }, [post]);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const postData = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        author_id: user?.id,
        author: user?.user_metadata?.full_name || user?.email || 'Anonymous',
        published_at: data.status === 'published' ? new Date().toISOString() : null,
        reading_time: Math.ceil(data.content.split(' ').length / 200), // Estimate reading time
      };

      if (post) {
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', post.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('posts')
          .insert(postData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      toast.success(post ? 'Post updated successfully' : 'Post created successfully');
      onClose();
    },
    onError: (error) => {
      toast.error('Failed to save post: ' + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }
    
    // Auto-generate slug if not provided
    if (!formData.slug) {
      formData.slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    
    mutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="bg-navy-800/50 border-gray-700"
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => handleInputChange('slug', e.target.value)}
            className="bg-navy-800/50 border-gray-700"
            placeholder="auto-generated-from-title"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => handleInputChange('excerpt', e.target.value)}
          className="bg-navy-800/50 border-gray-700"
          rows={3}
          placeholder="Brief description of the post..."
        />
      </div>

      <div>
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          className="bg-navy-800/50 border-gray-700"
          rows={12}
          placeholder="Write your post content here..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
            <SelectTrigger className="bg-navy-800/50 border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="bg-navy-800/50 border-gray-700"
          />
        </div>
        <div>
          <Label htmlFor="image_url">Featured Image URL</Label>
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => handleInputChange('image_url', e.target.value)}
            className="bg-navy-800/50 border-gray-700"
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => handleInputChange('tags', e.target.value)}
          className="bg-navy-800/50 border-gray-700"
          placeholder="tech, javascript, react"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-primary to-accent text-navy"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
        </Button>
      </div>
    </form>
  );
};

export default PostEditor;
