import { WorkspaceService } from '~/lib/services/workspace.service';
import prisma_client from '~/prisma/prisma.client';

export default defineEventHandler(async event => {
  const queryParams = getQuery(event);

  if (!queryParams.userId)
    throw createError({
      status: 400,
      message: 'Bad Request',
    });

  const workspaces = await WorkspaceService.getPrivateWorkspaces(
    queryParams.userId as string,
  );

  return {
    data: workspaces,
  };
});
