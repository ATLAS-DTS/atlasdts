-- Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  supplies_description TEXT NOT NULL,
  photo_urls TEXT[],
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'quoted', 'accepted', 'shipped', 'inspecting', 'paid', 'declined', 'closed')),
  quote_amount DECIMAL,
  admin_notes TEXT,
  source TEXT DEFAULT 'website',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the form)
CREATE POLICY "Allow anonymous inserts" ON inquiries
  FOR INSERT TO anon
  WITH CHECK (true);

-- No public reads
CREATE POLICY "No public reads" ON inquiries
  FOR SELECT TO anon
  USING (false);

-- Admin can read all (authenticated users — for future admin panel)
CREATE POLICY "Authenticated can read all" ON inquiries
  FOR SELECT TO authenticated
  USING (true);

-- Admin can update all
CREATE POLICY "Authenticated can update all" ON inquiries
  FOR UPDATE TO authenticated
  USING (true);

-- ---------------------------------------------------------------------------
-- Supabase Storage setup
-- ---------------------------------------------------------------------------

-- Create a public bucket for inquiry photos, 5MB per-file limit.
insert into storage.buckets (id, name, public, file_size_limit)
values ('inquiry-photos', 'inquiry-photos', true, 5242880)
on conflict (id) do nothing;

-- Allow anonymous uploads into the inquiry-photos bucket.
CREATE POLICY "Allow anonymous uploads to inquiry-photos" ON storage.objects
  FOR INSERT TO anon
  WITH CHECK (bucket_id = 'inquiry-photos');

-- Allow public read access so links in admin notification emails resolve.
CREATE POLICY "Public read access to inquiry-photos" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'inquiry-photos');
