/*
  # Set up storage policies for blog images

  1. Storage Buckets
    - Create `blog-images` bucket for storing post images
    - Set up public access for reading images
    - Restrict uploads to authenticated users

  2. Security
    - Enable policies for:
      - Public read access
      - Authenticated users can upload
      - Authors can delete their own images
*/

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to images
CREATE POLICY "Public can view blog images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'blog-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images');

-- Allow users to delete their own images
CREATE POLICY "Users can delete own images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images' AND auth.uid()::text = owner);