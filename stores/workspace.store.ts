import { defineStore } from 'pinia';
import type { Folder } from '~/lib/services/service.type';
import type { AppFolderType, AppWorkspaceType } from '~/lib/types';
import _ from 'lodash';

export const useWorkspaceStore = defineStore('workspace', () => {
  const workspace = ref<AppWorkspaceType>();

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

  return {
    workspace,
    fetchCurrentWorkspace,
    setCurrentWorkspace,
    updateWorkspaceFolder,
  };
});
