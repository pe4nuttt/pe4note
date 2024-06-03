import { defineStore } from 'pinia';
import type { AppWorkspaceType } from '~/lib/types';

export const useWorkspaceStore = defineStore('workspace', () => {
  const workspace = ref<AppWorkspaceType>();

  const fetchCurrentWorkspace = async (workspaceId: string) => {
    try {
      const res = await getWorkspaceDetailApi(workspaceId);
      if (res.data) {
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

  return {
    workspace,
    fetchCurrentWorkspace,
    setCurrentWorkspace,
  };
});
