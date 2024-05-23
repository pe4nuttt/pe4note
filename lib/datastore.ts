import { useSupabaseClient } from '#imports';
import type { User } from './services/service.type';

export const getUsersFromSearch = async (emailKey: string): Promise<User[]> => {
  const supabase = useSupabaseClient();
  if (!emailKey) return [];

  const { data, error } = await supabase
    .from('users')
    .select()
    .ilike('email', `%${emailKey}%`);

  if (error) {
    console.log('[ERROR] getUsersFromSearch:', error);
    throw error;
  }

  return data;
};
