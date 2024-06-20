import { useSupabaseClient } from '#imports';
import type { File, Folder, User } from './services/service.type';
import type { Database } from './supabase/supabase.types';

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

export const updateFolderTitleEmoji = async (params: {
  folderId: string;
  newTitle: string;
  newEmoji: string;
}): Promise<Folder> => {
  const supabase = useSupabaseClient<Database>();
  const { folderId, newTitle, newEmoji } = params;

  const { data, error } = await supabase
    .from('folders')
    .update({
      title: newTitle,
      iconId: newEmoji,
    })
    .eq('id', folderId)
    .select();

  if (error) {
    throw error;
  }

  if (!data?.length) {
    throw new Error('Not Found');
  }

  return {
    ...data[0],
    created_at: new Date(data[0].created_at),
  };
};

export const updateFolder = async (
  params: Partial<Folder> & { id: string },
): Promise<
  | (
      | Folder
      | {
          created_at: string;
        }
    )
  | null
  | undefined
> => {
  const supabase = useSupabaseClient<Database>();
  const { data, error } = await supabase
    .from('folders')
    .update({
      ...(params as Folder & {
        created_at: string;
      }),
    })
    .eq('id', params.id)
    .select();
  if (error) {
    throw error;
  }

  return data?.[0];
};

export const updateFile = async (
  params: Partial<File> & { id: string },
): Promise<
  | (
      | File
      | {
          created_at: string;
        }
    )
  | null
  | undefined
> => {
  const supabase = useSupabaseClient<Database>();
  const { data, error } = await supabase
    .from('files')
    .update({
      ...(params as File & {
        created_at: string;
      }),
    })
    .eq('id', params.id)
    .select();
  if (error) {
    throw error;
  }

  return data?.[0];
};

export const addNewFolder = async (folderData: Folder) => {
  const supabase = useSupabaseClient<Database>();

  const { data, error } = await supabase
    .from('folders')
    .insert(
      folderData as Folder & {
        created_at: string;
      },
    )
    .select();

  if (error) {
    throw error;
  }

  return data?.[0];
};

export const addNewFile = async (fileData: File) => {
  const supabase = useSupabaseClient<Database>();

  const { data, error } = await supabase
    .from('files')
    .insert(
      fileData as File & {
        created_at: string;
      },
    )
    .select();

  if (error) {
    throw error;
  }

  return data?.[0];
};
