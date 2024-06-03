import { useSupabaseClient } from '#imports';
import type { Folder, User } from './services/service.type';

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

export const updateFolderTitle = async (
  folderId: string,
  newTitle: string,
): Promise<Folder> => {
  const supabase = useSupabaseClient();

  const { data, error } = await supabase
    .from('folders')
    .update({
      title: newTitle,
    })
    .eq('id', folderId)
    .select();

  if (error) {
    throw error;
  }

  return data;
};
