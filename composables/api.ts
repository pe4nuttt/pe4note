import type { Prisma } from '@prisma/client';
import { string } from 'zod';
import type {
  Document,
  Folder,
  GetWorkspaceListType,
  Subscription,
  Workspace,
} from '~/lib/services/service.type';
import type { AppWorkspaceType } from '~/lib/types';
import qs from 'qs';

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
): Promise<Subscription> => {
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

export const getWorkspaceDetailApi = async (
  workspaceId: string,
): Promise<{ data: AppWorkspaceType }> => {
  const { apiFetch } = useBaseFetch();
  return await apiFetch(`/workspace/${workspaceId}`, {
    method: 'GET',
  });
};

export const getDocumentApi = async (
  documentId: string,
  select?: Prisma.documentsSelect,
): Promise<{ data: Document }> => {
  const { apiFetch } = useBaseFetch();
  return await apiFetch(`/document/${documentId}`, {
    method: 'GET',
    params: {
      select: select || '',
    },
  });
};

export const updateDocumentInfoApi = async (
  documentId: string,
  data: Partial<Document>,
): Promise<{ data: Document }> => {
  const { apiFetch } = useBaseFetch();

  return await apiFetch(`/document/${documentId}`, {
    method: 'PATCH',
    body: data,
  });
};
