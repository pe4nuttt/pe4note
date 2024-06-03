import * as z from 'zod';
import prisma_client from '~/prisma/prisma.client';
import type { workspaces } from '@prisma/client';
import { WorkspaceService } from '~/lib/services/workspace.service';
import { Workspace } from '~/lib/services/service.type';

const CreateWorkspaceSchema = z.object({
  id: z.string().describe('Workspace must have id'),
  title: z
    .string()
    .describe('Workspace Name')
    .min(1, 'Workspace name must be min of 1 character'),
  iconId: z.string().describe('Workspace must have icon'),
  logo: z.string().nullish(),
  data: z.string().nullish(),
  inTrash: z.string().nullish(),
  bannerUrl: z.string().nullish(),
});

export default defineEventHandler(async event => {
  const resBody = await readValidatedBody(event, body => {
    console.log('[VALIDATE]', body);
    return CreateWorkspaceSchema.safeParse(body);
  });

  if (!resBody.success) {
    console.log('[VALIDATE ERROR]', resBody.error.issues);
    throw createError({
      statusCode: 400,
      message: 'Invalid Data',
    });
  }

  const newWorkspace = await WorkspaceService.createWorkspace({
    ...resBody.data,
    workspaceOwner: event.context.user.id as string,
  } as Workspace);

  return newWorkspace;
});
