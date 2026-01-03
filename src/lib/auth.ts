import { supabase, UserProfile, isSupabaseConfigured } from './supabase';

// Verificar se Supabase está configurado
function checkSupabaseConfig() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase não está configurado. Configure as variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }
}

export async function signUp(email: string, password: string, fullName: string, role: 'gestor' | 'entregador') {
  checkSupabaseConfig();
  
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error('Erro ao criar usuário');

  // Criar perfil do usuário
  const { error: profileError } = await supabase
    .from('user_profiles')
    .insert({
      user_id: authData.user.id,
      full_name: fullName,
      role: role,
      approval_status: role === 'entregador' ? 'pending' : 'approved',
    });

  if (profileError) throw profileError;

  return authData;
}

export async function signIn(email: string, password: string) {
  checkSupabaseConfig();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Verificar se o usuário está aprovado
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', data.user.id)
    .single();

  if (profile && profile.approval_status !== 'approved') {
    await supabase.auth.signOut();
    throw new Error('Sua conta ainda não foi aprovada por um gestor.');
  }

  return data;
}

export async function signOut() {
  checkSupabaseConfig();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  checkSupabaseConfig();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  checkSupabaseConfig();
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) return null;
  return data;
}
