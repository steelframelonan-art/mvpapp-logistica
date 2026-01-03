import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Valores padrão para evitar erro quando env vars não estão configuradas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

// Verificar se as credenciais estão configuradas
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://placeholder.supabase.co' && 
         supabaseAnonKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';
};

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type UserRole = 'super_admin' | 'gestor' | 'entregador';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type DeliveryStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  role: UserRole;
  approval_status: ApprovalStatus;
  device_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Delivery {
  id: string;
  entregador_id?: string;
  gestor_id?: string;
  title: string;
  description?: string;
  total_volumes: number;
  volumes_delivered: number;
  status: DeliveryStatus;
  pickup_address?: string;
  delivery_address: string;
  pickup_lat?: number;
  pickup_lng?: number;
  delivery_lat?: number;
  delivery_lng?: number;
  created_at: string;
  updated_at: string;
}
