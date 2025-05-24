-- Add admin and author policies
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Admin can do everything
CREATE POLICY "Admins can do everything"
ON posts
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Authors can read all posts
CREATE POLICY "Authors can read all posts"
ON posts
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'author'
  )
);

-- Authors can create their own posts
CREATE POLICY "Authors can create their own posts"
ON posts
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'author'
  )
  AND author = (
    SELECT email FROM auth.users WHERE id = auth.uid()
  )
);

-- Authors can update their own posts
CREATE POLICY "Authors can update their own posts"
ON posts
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'author'
  )
  AND author = (
    SELECT email FROM auth.users WHERE id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'author'
  )
  AND author = (
    SELECT email FROM auth.users WHERE id = auth.uid()
  )
);

-- Function to automatically assign role to new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', 'author')
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      full_name = EXCLUDED.full_name,
      updated_at = now();
  RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger to automatically create profile for new users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
