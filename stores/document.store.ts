import { defineStore } from 'pinia';
import type { Document } from '~/lib/services/service.type';

export const useDocumentStore = defineStore('document', () => {
  const document = ref<Document>();

  const fetchCurrentDocument = async (documentId: string) => {
    try {
      const res = await getDocumentApi(documentId);
    } catch (error) {
      console.log('[ERROR - STORE] fetchCurrentDocument', error);
      throw error;
    }
  };

  return {
    document,
    fetchCurrentDocument,
  };
});
