export type UserRole = 'user' | 'admin';

export interface Profile {
  id: string;
  email: string | null;
  username: string | null;
  phone: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  price_starting_from: number | null;
  icon: string | null;
  features: string[] | null;
  created_at: string;
  updated_at: string;
}

export type LocationType = 'in-store' | 'doorstep';
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  customer_address: string | null;
  service_id: string | null;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  location_type: LocationType;
  status: AppointmentStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  service_type: string | null;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteContent {
  id: string;
  section: string;
  content: Record<string, any>;
  updated_at: string;
}

export interface AppointmentFormData {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_address?: string;
  service_id?: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  location_type: LocationType;
  notes?: string;
}

export interface ReviewFormData {
  customer_name: string;
  rating: number;
  review_text: string;
  service_type?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface BlockedSlot {
  id: string;
  date: string;
  time_slot: string;
  reason: string | null;
  created_at: string;
  created_by: string | null;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
  description: string | null;
  updated_at: string;
  updated_by: string | null;
}
