/*
  # Create posts table and policies

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `content` (text)
      - `cover_image_url` (text)
      - `category` (text)
      - `author` (text)
      - `tags` (text[])
      - `draft` (boolean)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `posts` table
    - Add policies for:
      - Public can read published posts
      - Authenticated users can create posts
      - Authors can update/delete their own posts
*/

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text,
  cover_image_url text,
  category text,
  author text NOT NULL,
  tags text[],
  draft boolean DEFAULT true,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can read published posts"
  ON posts
  FOR SELECT
  TO public
  USING (NOT draft AND published_at IS NOT NULL AND published_at <= now());

CREATE POLICY "Authenticated users can create posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authors can update own posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (author = current_user)
  WITH CHECK (author = current_user);

CREATE POLICY "Authors can delete own posts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (author = current_user);

-- Create a trigger to handle updated_at
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create indexes for better performance
CREATE INDEX posts_slug_idx ON posts (slug);
CREATE INDEX posts_published_at_idx ON posts (published_at DESC NULLS LAST);
CREATE INDEX posts_category_idx ON posts (category);
CREATE INDEX posts_author_idx ON posts (author);