import { defineStore } from 'pinia';
import type { Document, Collection } from '~/lib/services/service.type';
import type { AppCollectionType, AppWorkspaceType } from '~/lib/types';
import _ from 'lodash';
import { addNewDocument, addNewCollection } from '~/lib/datastore';

export const useWorkspaceStore = defineStore('workspace', () => {
  const workspace = ref<AppWorkspaceType>();

  // Recent ID - use for open sub menu in the sidebar
  const recentAddedDocumentId = ref<string>();
  const recentAddedCollectionId = ref<string>();
  const recentAddedParentCollectionId = ref<string>();
  const recentAddedParentDocumentId = ref<string>();

  const onAddNewCollection = (collection: Collection) => {
    recentAddedCollectionId.value = collection.id;
    // if (collection.parentCollectionId) {
    //   recentAddedParentCollectionId.value = collection.parentCollectionId;
    // }
  };

  const onAddNewDocument = (document: Document) => {
    recentAddedDocumentId.value = document.id;
    if (document.collectionId) {
      recentAddedParentCollectionId.value = document.collectionId;
    }
    if (document.parentDocumentId) {
      recentAddedParentDocumentId.value = document.parentDocumentId;
    }
  };

  const fetchCurrentWorkspace = async (workspaceId: string) => {
    try {
      const res = await getWorkspaceDetailApi(workspaceId);
      if (res.data) {
        console.log('[fetchCurrentWorkspace]', res.data);
        workspace.value = res.data;
      }
    } catch (error) {
      console.log('[ERROR - STORE] fetchCurrentWorkspace', error);
      throw error;
    }
  };

  const setCurrentWorkspace = (workspaceData: AppWorkspaceType) => {
    workspace.value = workspaceData;
  };

  const updateWorkspaceCollection = (
    collectionId: string,
    data: Partial<Collection>,
  ) => {
    const findAndReplaceCollection = (collections: AppCollectionType[]) => {
      for (let i = 0; i < collections.length; i++) {
        const collection = collections[i];
        if (collection.id === collectionId) {
          // Found the collection to update
          Object.assign(collection, data); // Update properties
          return; // Stop searching once found
        }
        // else if (collection.collections?.length) {
        //   findAndReplaceCollection(collection.collections); // Recursive search in subcollections
        // }
      }
    };

    if (workspace.value?.collections) {
      findAndReplaceCollection(workspace.value.collections);
    }
  };

  const handleCreateNewCollection = async (collection: Collection) => {
    try {
      const res = await addNewCollection(collection);
      recentAddedCollectionId.value = res.id;

      onAddNewCollection(collection);
    } catch (error) {
      console.log('[ERROR - STORE] handleCreateNewCollection', error);
      throw error;
    }
  };

  const handleCreateNewDocument = async (document: Document) => {
    try {
      const res = await addNewDocument(document);
      onAddNewDocument(document);
      return res;
    } catch (error) {
      console.log('[ERROR - STORE] handleCreateNewDocument', error);
      throw error;
    }
  };

  return {
    workspace,
    recentAddedDocumentId,
    recentAddedCollectionId,
    recentAddedParentCollectionId,
    recentAddedParentDocumentId,
    fetchCurrentWorkspace,
    setCurrentWorkspace,
    updateWorkspaceCollection,
    handleCreateNewCollection,
    handleCreateNewDocument,
  };
});
