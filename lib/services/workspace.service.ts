import prisma_client from '~/prisma/prisma.client';
import { z } from 'zod';
import type { CreateWorkspaceSchema } from '../types';
import type { Workspace } from './service.type';
import { validate } from 'uuid';
import { Prisma, type Workspaces } from '@prisma/client';

export namespace WorkspaceService {
  export async function createWorkspace(
    workspace: Workspace,
    // workspace: z.infer<typeof CreateWorkspaceSchema>,
  ) {
    const newWorkspace = await prisma_client.workspaces.create({
      data: {
        ...workspace,
      },
    });

    return newWorkspace;
  }

  export async function getAllWorkspaces(userId: string) {
    const workspaces = await prisma_client.workspaces.findMany({
      where: {
        workspaceOwner: userId,
      },
    });

    return workspaces;
  }

  export async function getWorkspaceFolders(uid: string, workspaceId: string) {
    const isValid = validate(workspaceId);

    if (!isValid)
      throw createError({
        status: 400,
        message: 'Invalid workspace id',
      });

    const folders = await prisma_client.folders.findMany({
      where: {
        workspaceId,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return folders;
  }

  export async function getPrivateWorkspaces(userId: string) {
    // const workspaces: Workspaces[] = await prisma_client.$queryRaw`
    //   SELECT w.*
    //   FROM "Workspaces" w
    //   LEFT JOIN "Collaborators" c ON w.id = c."workspaceId"
    //   WHERE c."workspaceId" IS NULL
    //   AND w."workspaceOwner" = ${userId}::uuid
    // `;

    const workspaces = await prisma_client.workspaces.findMany({
      where: {
        workspaceOwner: userId,
        Collaborators: {
          none: {},
        },
      },
    });

    return workspaces;
  }

  export async function getCollaboratingWorkspaces(userId: string) {
    const workspaces = await prisma_client.$queryRaw(
      Prisma.sql`
      SELECT w.*
      FROM users u
      INNER JOIN "Collaborators" c ON c."userId" = u.id
      INNER JOIN "Workspaces" w ON c."workspaceId" = w.id
      WHERE u.id = ${userId}::uuid
      `,
    );

    return workspaces;
  }

  export async function getSharedWorkspaces(userId: string) {
    const workspaces = await prisma_client.$queryRaw(
      Prisma.sql`
      SELECT DISTINCT w.*
      FROM users u
      INNER JOIN "Collaborators" c ON c."userId" = u.id
      INNER JOIN "Workspaces" w ON c."workspaceId" = w.id
      WHERE w."workspaceOwner" = ${userId}::uuid
      `,
    );

    return workspaces;
  }

  export async function addCollaborators(
    collaboratorIds: string[],
    workspaceId: string,
  ) {
    const isValid = validate(workspaceId);

    if (!isValid)
      throw createError({
        status: 400,
        message: 'Invalid workspace id',
      });

    const foundWorkspace = await prisma_client.workspaces.findUnique({
      where: {
        id: workspaceId,
      },
    });

    if (!foundWorkspace) {
      throw createError({
        status: 400,
        message: 'Invalid workspace id',
      });
    }

    const result = await prisma_client.collaborators.createMany({
      data: collaboratorIds.map(uid => ({
        userId: uid,
        workspaceId: workspaceId,
      })),
    });

    return result;
  }
}
