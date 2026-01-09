-- Create blocked_slots table for admin to block specific appointment slots
CREATE TABLE IF NOT EXISTS blocked_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES profiles(id),
  UNIQUE(date, time_slot)
);

-- Create settings table for configurable values like WhatsApp number
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES profiles(id)
);

-- Insert default WhatsApp number
INSERT INTO settings (key, value, description)
VALUES ('whatsapp_number', '+919952274058', 'WhatsApp contact number for customer support')
ON CONFLICT (key) DO NOTHING;

-- RLS Policies for blocked_slots
ALTER TABLE blocked_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view blocked slots" ON blocked_slots
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can insert blocked slots" ON blocked_slots
  FOR INSERT TO authenticated 
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can delete blocked slots" ON blocked_slots
  FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- RLS Policies for settings
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view settings" ON settings
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can update settings" ON settings
  FOR UPDATE TO authenticated 
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can insert settings" ON settings
  FOR INSERT TO authenticated 
  WITH CHECK (is_admin(auth.uid()));