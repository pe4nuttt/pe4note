import prisma_client from '~/prisma/prisma.client';
import { z } from 'zod';
import type { CreateWorkspaceSchema } from '../types';

export namespace WorkspaceService {
  export async function createWorkspace(
    workspace: z.infer<typeof CreateWorkspaceSchema>,
  ) {}

  export async function getAllWorkspaces(userId: string) {
    const workspaces = await prisma_client.workspaces.findMany({
      where: {
        workspaceOwner: userId,
      },
    });

    return workspaces;
  }
}
