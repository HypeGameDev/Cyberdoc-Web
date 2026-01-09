import { supabase } from './supabase';
import type {
  Service,
  Appointment,
  Review,
  SiteContent,
  AppointmentFormData,
  ReviewFormData,
  Profile,
  BlockedSlot,
  Setting,
} from '@/types/types';

// Services API
export const getServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const getServiceById = async (id: string): Promise<Service | null> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const updateService = async (id: string, updates: Partial<Service>): Promise<Service | null> => {
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

// Appointments API
export const createAppointment = async (appointmentData: AppointmentFormData): Promise<Appointment | null> => {
  const { data, error } = await supabase
    .from('appointments')
    .insert({
      ...appointmentData,
      customer_email: appointmentData.customer_email || null,
      customer_address: appointmentData.customer_address || null,
      service_id: appointmentData.service_id || null,
      notes: appointmentData.notes || null,
    })
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const getAppointments = async (): Promise<Appointment[]> => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('appointment_date', { ascending: false })
    .order('appointment_time', { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const getAppointmentById = async (id: string): Promise<Appointment | null> => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const updateAppointment = async (id: string, updates: Partial<Appointment>): Promise<Appointment | null> => {
  const { data, error } = await supabase
    .from('appointments')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const deleteAppointment = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Reviews API
export const createReview = async (reviewData: ReviewFormData): Promise<Review | null> => {
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      ...reviewData,
      service_type: reviewData.service_type || null,
    })
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const getApprovedReviews = async (): Promise<Review[]> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const getAllReviews = async (): Promise<Review[]> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const updateReview = async (id: string, updates: Partial<Review>): Promise<Review | null> => {
  const { data, error } = await supabase
    .from('reviews')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const deleteReview = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Site Content API
export const getSiteContent = async (section: string): Promise<SiteContent | null> => {
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .eq('section', section)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const getAllSiteContent = async (): Promise<SiteContent[]> => {
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .order('section', { ascending: true });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const updateSiteContent = async (section: string, content: Record<string, any>): Promise<SiteContent | null> => {
  const { data, error } = await supabase
    .from('site_content')
    .upsert({ section, content })
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

// Profiles API
export const getProfiles = async (): Promise<Profile[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const updateProfile = async (id: string, updates: Partial<Profile>): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

// Image Upload API
export const uploadImage = async (file: File, path: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from('8k8ae6le0c8x_service_images')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('8k8ae6le0c8x_service_images')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
};

export const deleteImage = async (path: string): Promise<void> => {
  const { error } = await supabase.storage
    .from('8k8ae6le0c8x_service_images')
    .remove([path]);

  if (error) throw error;
};

// Statistics API for Admin Dashboard
export const getStatistics = async () => {
  const [appointmentsResult, reviewsResult, servicesResult] = await Promise.all([
    supabase.from('appointments').select('*', { count: 'exact', head: true }),
    supabase.from('reviews').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
  ]);

  return {
    totalAppointments: appointmentsResult.count || 0,
    totalReviews: reviewsResult.count || 0,
    totalServices: servicesResult.count || 0,
  };
};

// Blocked Slots API
export const getBlockedSlots = async (): Promise<BlockedSlot[]> => {
  const { data, error } = await supabase
    .from('blocked_slots')
    .select('*')
    .order('date', { ascending: true })
    .order('time_slot', { ascending: true });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const getBlockedSlotsByDate = async (date: string): Promise<BlockedSlot[]> => {
  const { data, error } = await supabase
    .from('blocked_slots')
    .select('*')
    .eq('date', date);

  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const createBlockedSlot = async (
  date: string,
  timeSlot: string,
  reason?: string
): Promise<BlockedSlot | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('blocked_slots')
    .insert({
      date,
      time_slot: timeSlot,
      reason: reason || null,
      created_by: user?.id || null,
    })
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const deleteBlockedSlot = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('blocked_slots')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Settings API
export const getSettings = async (): Promise<Setting[]> => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .order('key', { ascending: true });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const getSettingByKey = async (key: string): Promise<Setting | null> => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('key', key)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const updateSetting = async (key: string, value: string): Promise<Setting | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('settings')
    .update({
      value,
      updated_at: new Date().toISOString(),
      updated_by: user?.id || null,
    })
    .eq('key', key)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};
