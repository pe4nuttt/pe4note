import * as z from 'zod';
import { WorkspaceService } from '~/lib/services/workspace.service';
import prisma_client from '~/prisma/prisma.client';

const AddCollaboratorsSchema = z.object({
  collaboratorIds: z.array(z.string()),
});

export default defineEventHandler(async event => {
  const workspaceId = getRouterParam(event, 'workspaceId');

  if (!workspaceId)
    throw createError({
      status: 400,
      message: 'Bad Request',
    });
  const resBody = await readValidatedBody(event, body => {
    console.log('[VALIDATE]', body);
    return AddCollaboratorsSchema.safeParse(body);
  });

  if (!resBody.success) {
    throw createError({
      statusCode: 400,
      message: 'Bad Request',
    });
  }

  const res = await WorkspaceService.addCollaborators(
    resBody.data.collaboratorIds,
    workspaceId,
  );

  return {
    data: res,
  };
});
