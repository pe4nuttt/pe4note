import type { RealtimeChannel } from '@supabase/realtime-js';
import _ from 'lodash';
import { defineStore } from 'pinia';
import type { Collection } from '~/lib/services/service.type';
import type { AppCollectionType } from '~/lib/types';

export const useCollectionStore = defineStore('collection', () => {
  const collection = ref<AppCollectionType | null>();

  const fetchCurrentCollection = async (collectionId: string) => {
    try {
      const res = await getCollectionApi(collectionId);
      collection.value = res.data;
    } catch (error) {
      collection.value = null;
      console.log('[ERROR - STORE] fetchCurrentCollection', error);
      throw error;
    }
  };

  const updateCurrentCollection = async (
    collectionData: Partial<Collection>,
  ) => {
    if (!collection.value || _.isEmpty(collection.value)) return;
    try {
      const res = await updateCollectionInfoApi(
        collection.value.id,
        collectionData,
      );
    } catch (error) {
      throw error;
    }
  };

  return {
    collection,
    fetchCurrentCollection,
    updateCurrentCollection,
  };
});
