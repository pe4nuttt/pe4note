import { defineStore } from 'pinia';
import type { GetWorkspaceListType } from '~/lib/services/service.type';
import type { AppWorkspaceType } from '~/lib/types';

export const useWorkspaceListStore = defineStore('workspaceList', () => {
  const { apiFetch } = useBaseFetch();
  const user = useSupabaseUser();

  // const userStore = useUserStore();

  const privateWorkspaces = ref<AppWorkspaceType[]>([]);
  const sharedWorkspaces = ref<AppWorkspaceType[]>([]);
  const collaboratingWorkspaces = ref<AppWorkspaceType[]>([]);

  const setWorkspaces = async (
    privateWorkspacesData: AppWorkspaceType[],
    sharedWorkspacesData: AppWorkspaceType[],
    collaboratingWorkspacesData: AppWorkspaceType[],
  ) => {
    privateWorkspaces.value = privateWorkspacesData;
    sharedWorkspaces.value = sharedWorkspacesData;
    collaboratingWorkspaces.value = collaboratingWorkspacesData;
  };

  const fetchWorkspaces = async () => {
    try {
      if (user) {
        const [
          privateWorkspacesData,
          sharedWorkspacesData,
          collaboratingWorkspacesData,
        ] = await Promise.all(
          ['private', 'shared', 'collaborating'].map(async type => {
            {
              const user = useSupabaseUser();
              if (user.value?.id) {
                const res = await getWorkspaceListApi(
                  user.value.id,
                  type as GetWorkspaceListType,
                );
                return res.data;
              } else {
                alert('Error: uid missing');
              }
            }
          }),
        );
        console.log(
          '[fetchWorkspaces]',
          privateWorkspacesData,
          sharedWorkspacesData,
          collaboratingWorkspacesData,
        );
        privateWorkspaces.value =
          privateWorkspacesData?.map(workspace => ({
            ...workspace,
            folders: [],
            files: [],
          })) || [];
        sharedWorkspaces.value =
          sharedWorkspacesData?.map(workspace => ({
            ...workspace,
            folders: [],
            files: [],
          })) || [];
        collaboratingWorkspaces.value =
          collaboratingWorkspacesData?.map(workspace => ({
            ...workspace,
            folders: [],
            files: [],
          })) || [];
      }
    } catch (error) {
      console.log('[ERROR] fetchWorkspaces', error);
      alert(error);
    }
  };

  return {
    privateWorkspaces,
    sharedWorkspaces,
    collaboratingWorkspaces,
    setWorkspaces,
    fetchWorkspaces,
  };
});
