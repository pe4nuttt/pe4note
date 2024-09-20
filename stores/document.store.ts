import { defineStore } from 'pinia';
import type { Document } from '~/lib/services/service.type';
import type { AppDocumentType } from '~/lib/types';

type DocumentState = AppDocumentType & {
  id: string | null;
};

export const useDocumentStore = defineStore('document', () => {
  const document = ref<AppDocumentType | null>();

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

  return {
    document,
    fetchCurrentDocument,
  };
});
