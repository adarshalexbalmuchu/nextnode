import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ImageIcon, Plus, Save, EyeIcon, Calendar, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';
import { BlogService } from '@/services/BlogService';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Fetch categories from Supabase on component mount
  useEffect(() => {
    BlogService.getCategories()
      .then((cats) => setCategories(cats))
      .catch((err) => {
        toast.error('Failed to load categories');
        setCategories([]);
      });
  }, []);
  
  // Handle image upload to Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageUploading(true);
      
      try {
        const file = e.target.files[0];
        const imageUrl = await BlogService.uploadImage(file);
        setCoverImage(imageUrl);
        toast.success('Image uploaded successfully');
      } catch (error) {
        toast.error((error as Error).message || 'Error uploading image');
        console.error('Error uploading image:', error);
      } finally {
        setImageUploading(false);
      }
    }
  };
  
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  
  const handleSaveDraft = async () => {
    if (!title) {
      toast.error('Please add a title to save draft');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const post = await BlogService.createPost({
        title,
        content,
        cover_image_url: coverImage || undefined,
        category_id: categoryId || undefined,
        tags,
        status: 'draft',
      });
      
      toast.success('Draft saved successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error((error as Error).message || 'Error saving draft');
      console.error('Error saving draft:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handlePreview = () => {
    if (!title || !content) {
      toast.error('Please add content to preview');
      return;
    }
    
    toast.info('Preview functionality will be implemented with backend');
  };
  
  const handlePublish = async () => {
    if (!title || !content || !categoryId) {
      toast.error('Please fill all required fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const post = await BlogService.createPost({
        title,
        content,
        cover_image_url: coverImage || undefined,
        category_id: categoryId,
        tags,
        status: 'published',
        published_at: new Date(),
      });
      
      toast.success('Post published successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error((error as Error).message || 'Error publishing post');
      console.error('Error publishing post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSchedule = () => {
    toast.info('Schedule functionality will be implemented with backend');
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Create New Post</h1>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleSaveDraft} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} 
              Save Draft
            </Button>
            <Button variant="outline" onClick={handlePreview} disabled={isSubmitting}>
              <EyeIcon className="mr-2 h-4 w-4" /> Preview
            </Button>
            <Button variant="outline" onClick={handleSchedule} disabled={isSubmitting}>
              <Calendar className="mr-2 h-4 w-4" /> Schedule
            </Button>
            <Button onClick={handlePublish} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Publish
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-3xl font-bold border-0 border-b border-gray-200 pb-2 focus:outline-none focus:border-teal-500 bg-transparent"
            />
            
            {/* Cover Image */}
            <Card>
              <CardContent className="p-4">
                <label className="block">
                  <span className="text-sm font-medium">Cover Image</span>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    {coverImage ? (
                      <div className="w-full">
                        <img 
                          src={coverImage} 
                          alt="Cover preview" 
                          className="mx-auto h-48 object-cover rounded"
                        />
                        <button 
                          onClick={() => setCoverImage(null)}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Remove image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center">
                        <div className="flex flex-col items-center">
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-1 text-sm text-gray-600">
                            {imageUploading 
                              ? 'Uploading...' 
                              : 'Click or drag and drop to upload cover image'}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageUpload}
                          id="cover-image"
                        />
                        <label 
                          htmlFor="cover-image"
                          className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 mt-2"
                        >
                          Select Image
                        </label>
                      </div>
                    )}
                  </div>
                </label>
              </CardContent>
            </Card>
            
            {/* Content Editor */}
            <Card>
              <CardContent className="p-4">
                <textarea
                  placeholder="Start writing your blog content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[400px] p-4 resize-none border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                ></textarea>
              </CardContent>
            </Card>
          </div>
          
          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Category</h3>
                <select 
                  value={categoryId} 
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </CardContent>
            </Card>
            
            {/* Tags */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <div 
                      key={tag} 
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {tag}
                      <button 
                        className="ml-1 text-gray-500 hover:text-gray-700"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input 
                    type="text"
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button 
                    className="bg-teal-600 text-white px-3 rounded-r-md hover:bg-teal-700"
                    onClick={handleAddTag}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </CardContent>
            </Card>
            
            {/* Meta Information */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Meta Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="SEO Title (Optional)"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                      rows={3}
                      placeholder="SEO Description (Optional)"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Excerpt */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Excerpt</h3>
                <textarea
                  className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={3}
                  placeholder="Brief summary of your post"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Excerpts are used in blog listings and SEO descriptions if no meta description is provided.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewPost;
