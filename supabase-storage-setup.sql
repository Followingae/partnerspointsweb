-- Supabase Storage Setup SQL
-- Run this in your Supabase SQL Editor

-- Create the uploads bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true);

-- Set up Row Level Security (RLS) policies for the uploads bucket

-- Allow public read access to all files
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'uploads');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'uploads' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their own files
CREATE POLICY "Users can update own files" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'uploads' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their own files
CREATE POLICY "Users can delete own files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'uploads' 
  AND auth.role() = 'authenticated'
);

-- Alternative: Allow service role to manage all files (for admin functions)
CREATE POLICY "Service role can manage all files" ON storage.objects
FOR ALL USING (
  bucket_id = 'uploads' 
  AND auth.jwt() ->> 'role' = 'service_role'
);

-- Enable RLS on the storage.objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Optional: Create folder structure by inserting placeholder files
-- You can skip this if you want folders to be created dynamically

-- Blog images folder
INSERT INTO storage.objects (bucket_id, name, owner, metadata)
VALUES ('uploads', 'blog/.gitkeep', null, '{}');

-- Featured images folder  
INSERT INTO storage.objects (bucket_id, name, owner, metadata)
VALUES ('uploads', 'featured/.gitkeep', null, '{}');

-- General uploads folder
INSERT INTO storage.objects (bucket_id, name, owner, metadata)
VALUES ('uploads', 'general/.gitkeep', null, '{}');

-- Hero images folder
INSERT INTO storage.objects (bucket_id, name, owner, metadata) 
VALUES ('uploads', 'hero/.gitkeep', null, '{}');

-- Testimonial images folder
INSERT INTO storage.objects (bucket_id, name, owner, metadata)
VALUES ('uploads', 'testimonials/.gitkeep', null, '{}');