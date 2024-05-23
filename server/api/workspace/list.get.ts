import * as z from 'zod';
import { GetWorkspaceListType } from '~/lib/services/service.type';
import { WorkspaceService } from '~/lib/services/workspace.service';
import prisma_client from '~/prisma/prisma.client';

const getWorkspaceListSchema = z.object({
  userId: z.string(),
  type: z.nativeEnum(GetWorkspaceListType).default(GetWorkspaceListType.ALL),
});

export default defineEventHandler(async event => {
  const validateQueryParams = await getValidatedQuery(
    event,
    getWorkspaceListSchema.safeParse,
  );

  if (!validateQueryParams.success)
    throw createError({
      status: 400,
      message: 'Bad Request',
    });

  const queryParams = validateQueryParams.data;

  let workspaces;

  switch (queryParams.type) {
    case GetWorkspaceListType.ALL:
      // workspaces = await WorkspaceService.getPrivateWorkspaces(
      //   queryParams.userId as string,
      // );
      break;
    case GetWorkspaceListType.COLLABORATING:
      workspaces = await WorkspaceService.getCollaboratingWorkspaces(
        queryParams.userId as string,
      );
      break;
    case GetWorkspaceListType.PRIVATE:
      workspaces = await WorkspaceService.getPrivateWorkspaces(
        queryParams.userId as string,
      );
      break;
    case GetWorkspaceListType.SHARED:
      workspaces = await WorkspaceService.getSharedWorkspaces(
        queryParams.userId as string,
      );
      break;
  }

  return {
    data: workspaces,
  };
});
