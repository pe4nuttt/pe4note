import { defineStore } from 'pinia';
import type { File, Folder } from '~/lib/services/service.type';
import type { AppFolderType, AppWorkspaceType } from '~/lib/types';
import _ from 'lodash';
import { addNewFile, addNewFolder } from '~/lib/datastore';

export const useWorkspaceStore = defineStore('workspace', () => {
  const workspace = ref<AppWorkspaceType>();

  // Recent ID - use for open sub menu in the sidebar
  const recentAddedFileId = ref<string>();
  const recentAddedFolderId = ref<string>();
  const recentAddedParentFolderId = ref<string>();

  const onAddNewFolder = (folder: Folder) => {
    recentAddedFolderId.value = folder.id;
    if (folder.parentFolderId) {
      recentAddedParentFolderId.value = folder.parentFolderId;
    }
  };

  const onAddNewFile = (file: File) => {
    recentAddedFileId.value = file.id;
    if (file.folderId) {
      recentAddedParentFolderId.value = file.folderId;
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

  const updateWorkspaceFolder = (folderId: string, data: Partial<Folder>) => {
    const findAndReplaceFolder = (folders: AppFolderType[]) => {
      for (let i = 0; i < folders.length; i++) {
        const folder = folders[i];
        if (folder.id === folderId) {
          // Found the folder to update
          Object.assign(folder, data); // Update properties
          return; // Stop searching once found
        } else if (folder.folders?.length) {
          findAndReplaceFolder(folder.folders); // Recursive search in subfolders
        }
      }
    };

    if (workspace.value?.folders) {
      findAndReplaceFolder(workspace.value.folders);
    }
  };

  const handleCreateNewFolder = async (folder: Folder) => {
    try {
      const res = await addNewFolder(folder);
      recentAddedFolderId.value = res.id;

      onAddNewFolder(folder);
    } catch (error) {
      console.log('[ERROR - STORE] handleCreateNewFolder', error);
      throw error;
    }
  };

  const handleCreateNewFile = async (file: File) => {
    try {
      const res = await addNewFile(file);
      onAddNewFile(file);
      return res;
    } catch (error) {
      console.log('[ERROR - STORE] handleCreateNewFile', error);
      throw error;
    }
  };

  return {
    workspace,
    recentAddedFileId,
    recentAddedFolderId,
    recentAddedParentFolderId,
    fetchCurrentWorkspace,
    setCurrentWorkspace,
    updateWorkspaceFolder,
    handleCreateNewFolder,
    handleCreateNewFile,
  };
});
