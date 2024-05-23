import { SubscriptionService } from '~/lib/services/subscription.service';
import { WorkspaceService } from '~/lib/services/workspace.service';
import prisma_client from '~/prisma/prisma.client';

export default defineEventHandler(async event => {
  const workspaceId = getRouterParam(event, 'workspaceId');

  if (!workspaceId)
    throw createError({
      status: 400,
      message: 'Bad Request',
    });

  const uid = event.context.user.id as string;

  const folders = await WorkspaceService.getWorkspaceFolders(uid, workspaceId);

  return {
    data: folders,
  };
});
