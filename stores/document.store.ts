import type { RealtimeChannel } from '@supabase/realtime-js';
import _ from 'lodash';
import { defineStore } from 'pinia';
import type { Document } from '~/lib/services/service.type';
import type { AppDocumentType } from '~/lib/types';

type DocumentState = AppDocumentType & {
  id: string | null;
};

export const useDocumentStore = defineStore('document', () => {
  const document = ref<AppDocumentType | null>();
  const supabaseClient = useSupabaseClient();
  let documentChangesChannel: RealtimeChannel | null = null;

  watch(
    () => document.value?.id,
    async val => {
      await unsubscribeDocumentChange();
      if (val) {
        subscribeDocumentChange(val);
      }
    },
  );

  const openDocument = async (documentId: string) => {
    if (documentChangesChannel) {
      unsubscribeDocumentChange();
    }
    subscribeDocumentChange(documentId);
  };

  const closeDocument = async () => {
    unsubscribeDocumentChange();
  };

  const subscribeDocumentChange = (documentId: string) => {
    documentChangesChannel = supabaseClient
      .channel('current-document-changes-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents',
          filter: `id=eq.${documentId}`,
        },
        async payload => {
          switch (payload.eventType) {
            case 'INSERT':
              break;
            case 'UPDATE':
              console.debug('[UPDATE]', payload.new);
              if (payload.new) {
                updateDocumentChanges(payload.new);
              }
              break;
            case 'DELETE':
              break;
          }
        },
      );
    documentChangesChannel.subscribe();
  };

  const updateDocumentChanges = (data: { [key: string]: any }) => {
    if (document.value) {
      for (let key in data) {
        document.value[key as keyof AppDocumentType] = data[key];
      }
    } else {
      document.value = data as Document;
    }
  };

  const unsubscribeDocumentChange = async () => {
    if (documentChangesChannel) {
      await documentChangesChannel.unsubscribe();
    }
  };

  const fetchCurrentDocument = async (documentId: string) => {
    try {
      const res = await getDocumentApi(documentId);
      document.value = res.data;
    } catch (error) {
      document.value = null;
      console.log('[ERROR - STORE] fetchCurrentDocument', error);
      throw error;
    }
  };

  const updateCurrentDocument = async (documentData: Partial<Document>) => {
    if (!document.value || _.isEmpty(document.value)) return;

    try {
      const res = await updateDocumentInfoApi(document.value.id, documentData);
    } catch (error) {
      throw error;
    }
  };

  return {
    document,
    fetchCurrentDocument,
    updateCurrentDocument,
    openDocument,
    closeDocument,
  };
});
