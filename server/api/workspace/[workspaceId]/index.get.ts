import { WorkspaceService } from '~/lib/services/workspace.service';

export default defineEventHandler(async event => {
  const workspaceId = getRouterParam(event, 'workspaceId');

  if (!workspaceId)
    throw createError({
      status: 400,
      message: 'Bad Request',
    });

  const uid = event.context.user.id as string;

  const workspace = await WorkspaceService.getWorkspaceByIdWithPermission(
    uid,
    workspaceId,
  );

  return {
    data: workspace,
  };
});
