-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('user', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  username TEXT UNIQUE,
  phone TEXT,
  role user_role DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_starting_from DECIMAL(10, 2),
  icon TEXT,
  features TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  customer_address TEXT,
  service_id UUID REFERENCES public.services(id),
  service_name TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  location_type TEXT NOT NULL CHECK (location_type IN ('in-store', 'doorstep')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  service_type TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create site_content table for admin content management
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('8k8ae6le0c8x_service_images', '8k8ae6le0c8x_service_images', true);

-- Storage policies for images
CREATE POLICY "Public can view images" ON storage.objects
  FOR SELECT USING (bucket_id = '8k8ae6le0c8x_service_images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = '8k8ae6le0c8x_service_images');

CREATE POLICY "Authenticated users can update images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = '8k8ae6le0c8x_service_images');

CREATE POLICY "Authenticated users can delete images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = '8k8ae6le0c8x_service_images');

-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role = 'admin'::user_role
  );
$$;

-- Profiles RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins have full access to profiles" ON profiles
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id)
  WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM profiles WHERE id = auth.uid()));

-- Services RLS policies
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage services" ON services
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Appointments RLS policies
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create appointments" ON appointments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all appointments" ON appointments
  FOR SELECT TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update appointments" ON appointments
  FOR UPDATE TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete appointments" ON appointments
  FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- Reviews RLS policies
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create reviews" ON reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view approved reviews" ON reviews
  FOR SELECT USING (is_approved = true OR is_admin(auth.uid()));

CREATE POLICY "Admins can manage reviews" ON reviews
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Site content RLS policies
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site content" ON site_content
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage site content" ON site_content
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Trigger to sync auth.users to profiles
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count int;
BEGIN
  SELECT COUNT(*) INTO user_count FROM profiles;
  INSERT INTO public.profiles (id, email, username, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'username',
    NEW.phone,
    CASE WHEN user_count = 0 THEN 'admin'::public.user_role ELSE 'user'::public.user_role END
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION handle_new_user();

-- Insert initial services data
INSERT INTO public.services (name, description, price_starting_from, features) VALUES
('Laptop Repair', 'Complete laptop repair services including hardware and software issues', 499.00, ARRAY['Screen replacement', 'Keyboard repair', 'Battery replacement', 'Hardware diagnostics']),
('Desktop Servicing', 'Full desktop computer servicing and maintenance', 399.00, ARRAY['Hardware cleaning', 'Component upgrade', 'Performance optimization', 'Virus removal']),
('Chip-level Motherboard Repair', 'Advanced motherboard repair at component level', 1499.00, ARRAY['BGA reballing', 'Component replacement', 'Circuit repair', 'Power issue fix']),
('Data Recovery', 'Professional data recovery from damaged drives', 999.00, ARRAY['HDD recovery', 'SSD recovery', 'Deleted file recovery', 'Corrupted data repair']),
('OS Installation', 'Operating system installation and configuration', 299.00, ARRAY['Windows installation', 'Linux installation', 'Driver setup', 'Software configuration']);

-- Insert initial site content
INSERT INTO public.site_content (section, content) VALUES
('hero', '{"title": "Expert Computer & Laptop Repair Services", "subtitle": "17+ Years of Trusted Service in Coimbatore", "cta_text": "Book a Repair"}'),
('about', '{"text": "Cyberdoctor Computer Service Center has been serving Coimbatore since 2008 with premium computer repair services. Our expert technicians provide reliable solutions for all your computer and laptop needs."}'),
('contact', '{"phone": "+91 99522 74058", "email": "info@cyberdoctor.com", "address": "Saravanampatti, Coimbatore, Tamil Nadu", "hours": "Mon-Sat: 9:00 AM - 8:00 PM, Sun: 10:00 AM - 6:00 PM"}');