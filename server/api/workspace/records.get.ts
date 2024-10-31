import * as z from 'zod';
import { WorkspaceService } from '~/lib/services/workspace.service';

const getWorkspaceRecordsSchema = z.object({
  workspaceId: z.string(),
});

export default defineEventHandler(async event => {
  const validateQueryParams = await getValidatedQuery(
    event,
    getWorkspaceRecordsSchema.safeParse,
  );
  const uid = event.context.user.id as string;
  if (!uid)
    throw createError({
      status: 401,
      message: 'Unauthorized',
    });

  if (!validateQueryParams.success)
    throw createError({
      status: 400,
      message: 'Bad Request',
    });

  const queryParams = validateQueryParams.data;

  const records = await WorkspaceService.getWorkspaceRecords(
    uid,
    queryParams.workspaceId,
  );

  return {
    data: records,
  };
});
