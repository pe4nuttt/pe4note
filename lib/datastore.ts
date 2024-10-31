import { useSupabaseClient } from '#imports';
import type { Document, Collection, User } from './services/service.type';
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

export const updateCollectionTitleEmoji = async (params: {
  collectionId: string;
  newTitle: string;
  newEmoji: string;
}): Promise<Collection> => {
  const supabase = useSupabaseClient<Database>();
  const { collectionId, newTitle, newEmoji } = params;

  const { data, error } = await supabase
    .from('collections')
    .update({
      title: newTitle,
      iconId: newEmoji,
    })
    .eq('id', collectionId)
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

export const updateCollection = async (
  params: Partial<Collection> & { id: string },
): Promise<
  | (
      | Collection
      | {
          created_at: string;
        }
    )
  | null
  | undefined
> => {
  const supabase = useSupabaseClient<Database>();
  const { data, error } = await supabase
    .from('collections')
    .update({
      ...(params as Collection & {
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

export const updateDocument = async (
  params: Partial<Document> & { id: string },
): Promise<
  | (
      | Document
      | {
          created_at: string;
        }
    )
  | null
  | undefined
> => {
  const supabase = useSupabaseClient<Database>();
  const { data, error } = await supabase
    .from('documents')
    .update({
      ...(params as Document & {
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

export const addNewCollection = async (collectionData: Collection) => {
  const supabase = useSupabaseClient<Database>();

  const { data, error } = await supabase
    .from('collections')
    .insert(
      collectionData as Collection & {
        created_at: string;
      },
    )
    .select();

  if (error) {
    throw error;
  }

  return data?.[0];
};

export const addNewDocument = async (documentData: Document) => {
  const supabase = useSupabaseClient<Database>();

  const { data, error } = await supabase
    .from('documents')
    .insert(
      documentData as Document & {
        created_at: string;
      },
    )
    .select();

  if (error) {
    throw error;
  }

  return data?.[0];
};
