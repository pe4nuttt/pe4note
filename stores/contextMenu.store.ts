import { defineStore } from 'pinia';
import type { Document, Collection } from '~/lib/services/service.type';

export const useContextMenuStore = defineStore('contextMenuStore', () => {
  const collectionContextMenu = ref<{
    collection: Collection | null;
    event: MouseEvent | null;
    wrapperId?: string | null; // Collection sidebar element id
  }>();

  const onCollectionContextMenu = (
    event: MouseEvent,
    collection: Collection,
    wrapperId?: string,
  ) => {
    collectionContextMenu.value = {
      collection,
      event,
      wrapperId: wrapperId,
    };
  };

  const documentContextMenu = ref<{
    document: Document | null;
    event: MouseEvent | null;
    wrapperId?: string | null; // Document sidebar element id
  }>();

  const onDocumentContextMenu = (
    event: MouseEvent,
    document: Document,
    wrapperId?: string,
  ) => {
    documentContextMenu.value = {
      document,
      event,
      wrapperId: wrapperId,
    };
  };

  return {
    collectionContextMenu,
    documentContextMenu,
    onCollectionContextMenu,
    onDocumentContextMenu,
  };
});
