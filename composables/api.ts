import { string } from 'zod';
import type {
  Folder,
  GetWorkspaceListType,
  Workspace,
} from '~/lib/services/service.type';

export const createWorkspaceApi = async (
  workspace: Workspace,
): Promise<Workspace> => {
  const { apiFetch } = useBaseFetch();

  return await apiFetch('/workspace/create', {
    method: 'POST',
    body: workspace,
  });
};

export const getWorkspaceFoldersApi = async (
  workspaceId: string,
): Promise<Folder> => {
  const { apiFetch } = useBaseFetch();

  return await apiFetch(`/workspace/${workspaceId}/folders`, {
    method: 'GET',
  });
};

export const getUserSubscriptionStatus = async (
  userId: string,
): Promise<Folder> => {
  const { apiFetch } = useBaseFetch();

  return await apiFetch(`/subscription/user/${userId}`, {
    method: 'GET',
  });
};

export const getWorkspaceListApi = async (
  userId: string,
  type: GetWorkspaceListType,
): Promise<{ data: Workspace[] }> => {
  const { apiFetch } = useBaseFetch();

  return await apiFetch(`/workspace/list`, {
    method: 'GET',
    query: {
      userId,
      type,
    },
  });
};

export const addCollaboratorsApi = async (
  workspaceId: string,
  collaboratorIds: string[],
) => {
  const { apiFetch } = useBaseFetch();
  return await apiFetch(`/workspace/${workspaceId}/collaborators`, {
    method: 'POST',
    body: {
      collaboratorIds,
    },
  });
};
