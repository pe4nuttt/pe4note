import prisma_client from '~/prisma/prisma.client';
import { z } from 'zod';
import type {
  AppCollectionType,
  AppDocumentType,
  AppWorkspaceRecord,
  AppWorkspaceType,
  CreateWorkspaceSchema,
} from '../types';
import type {
  Collection,
  Document,
  Workspace,
  WorkspaceWithCollectionDocuments,
} from './service.type';
import { validate } from 'uuid';
import { Prisma, type collaborators, type workspaces } from '@prisma/client';
import { FolderService } from './folder.service';
import _ from 'lodash';

const buildDocumentTree = (documentList: Document[]) => {
  const hashTable: { [key: string]: AppDocumentType } = Object.create(null);
  const nestedDocument: AppDocumentType[] = [];
  documentList.forEach(document => {
    hashTable[document.id] = {
      ...document,
      documents: [],
    };
  });

  documentList.forEach(document => {
    if (document.parentDocumentId)
      (hashTable[document.parentDocumentId].documents as any[]).push(
        hashTable[document.id],
      );
    else nestedDocument.push(hashTable[document.id]);
  });

  return nestedDocument;
};

const buildDocumentAndCollectionTree = (
  entityList: ((Document | Collection) & {
    type: 'collection' | 'document';
  })[],
) => {
  const hashTable: { [key: string]: AppWorkspaceRecord } = {};
  const nestedRecords: AppWorkspaceRecord[] = [];

  entityList.forEach(entity => {
    hashTable[entity.id] = {
      ...entity,
      children: [],
    };
  });

  entityList.forEach(entity => {
    const parentId =
      entity.parentDocumentId || (entity as Document).collectionId;
    if (parentId) {
      hashTable[parentId].children.push(hashTable[entity.id]);
    } else {
      nestedRecords.push(hashTable[entity.id]);
    }
  });

  return nestedRecords;
};

export namespace WorkspaceService {
  export async function createWorkspace(
    workspace: Workspace,
    // Workspace: z.infer<typeof CreateWorkspaceSchema>,
  ) {
    const newWorkspace = await prisma_client.workspaces.create({
      data: {
        ...workspace,
      },
    });

    return newWorkspace;
  }

  export async function getWorkspaceById(workspaceId: string) {
    const workspace = await prisma_client.workspaces.findUnique({
      where: {
        id: workspaceId,
      },
    });

    return workspace;
  }

  export async function getWorkspaceByIdWithPermission_(
    uid: string,
    workspaceId: string,
  ) {
    let havePermission = false;
    const workspace:
      | (Workspace & {
          collaborators: collaborators[];
        })
      | null = await prisma_client.workspaces.findUnique({
      where: {
        id: workspaceId,
      },
      include: {
        collaborators: {
          include: {
            users: true,
          },
        },
        collections: {
          orderBy: {
            created_at: 'asc',
          },
          include: {
            documents: {
              orderBy: {
                created_at: 'asc',
              },
            },
          },
        },
        documents: {
          where: {
            collectionId: null,
          },
          orderBy: {
            created_at: 'asc',
          },
        },
        // folders: {
        //   where: {
        //     parentFolderId: null,
        //   },
        //   orderBy: {
        //     created_at: 'asc',
        //   },
        //   include: {
        //     files: {
        //       orderBy: {
        //         created_at: 'asc',
        //       },
        //     },
        //   },
        // },
        // files: {
        //   where: {
        //     folderId: null,
        //   },
        //   orderBy: {
        //     created_at: 'asc',
        //   },
        // },
      },
    });

    if (!workspace) {
      throw createError({
        status: 400,
        message: 'Invalid workspace id',
      });
    }

    if (workspace.workspaceOwner === uid) {
      havePermission = true;
    } else {
      const collaborator = await prisma_client.collaborators.findFirst({
        where: {
          userId: uid,
          workspaceId: workspaceId,
        },
      });
      if (collaborator) havePermission = true;
    }

    // if (workspace && workspace?.folders?.length) {
    //   await Promise.all(
    //     workspace.folders.map(async (folder, index) => {
    //       const subFolders = await FolderService.getNestedFolders(
    //         workspaceId,
    //         folder.id,
    //       );
    //       workspace.folders[index].folders = subFolders;
    //       return subFolders;
    //     }),
    //   );
    // }

    if (!havePermission) {
      throw createError({
        status: 403,
        message: 'Not have permission',
      });
    }

    return workspace;
  }

  export async function getWorkspaceByIdWithPermission(
    uid: string,
    workspaceId: string,
  ) {
    let havePermission = false;
    const workspace:
      | (Workspace & {
          collaborators: collaborators[];
        })
      | null = await prisma_client.workspaces.findUnique({
      where: {
        id: workspaceId,
      },
      include: {
        collaborators: {
          include: {
            users: true,
          },
        },
        collections: {
          include: {
            documents: {
              orderBy: {
                created_at: 'asc',
              },
            },
          },
          orderBy: {
            created_at: 'asc',
          },
        },
        documents: {
          where: {
            collectionId: null,
          },
          orderBy: {
            created_at: 'asc',
          },
        },
      },
    });

    if (!workspace) {
      throw createError({
        status: 400,
        message: 'Invalid workspace id',
      });
    }

    if (workspace.workspaceOwner === uid) {
      havePermission = true;
    } else {
      const collaborator = await prisma_client.collaborators.findFirst({
        where: {
          userId: uid,
          workspaceId: workspaceId,
        },
      });
      if (collaborator) havePermission = true;
    }

    // Convert data to nested collections & documents
    // if (workspace) {
    //   if (workspace.collections.length) {
    //     workspace.collections.forEach((collection, index) => {
    //       const documentTree = buildDocumentTree(collection.documents || []);
    //       workspace.collections[index].documents = documentTree;
    //     });
    //   }
    //   if (workspace.documents.length) {
    //     const documentTree = buildDocumentTree(workspace.documents);
    //     workspace.documents = documentTree;
    //   }
    // }

    if (!havePermission) {
      throw createError({
        status: 403,
        message: 'Not have permission',
      });
    }

    return workspace;
  }

  export async function getWorkspaceRecords(uid: string, workspaceId: string) {
    let havePermission = false;
    const workspace = await prisma_client.workspaces.findUnique({
      where: {
        id: workspaceId,
      },
      include: {
        collaborators: {
          include: {
            users: true,
          },
        },
        collections: {
          orderBy: {
            created_at: 'asc',
          },
        },
        documents: {
          orderBy: {
            created_at: 'asc',
          },
        },
      },
    });

    if (!workspace) {
      throw createError({
        status: 400,
        message: 'Invalid workspace id',
      });
    }

    if (workspace.workspaceOwner === uid) {
      havePermission = true;
    } else {
      const collaborator = await prisma_client.collaborators.findFirst({
        where: {
          userId: uid,
          workspaceId: workspaceId,
        },
      });
      if (collaborator) havePermission = true;
    }

    const tmpDocumentsAndCollections = [
      ...workspace.documents.map(item => ({
        ..._.omit(item, ['data']),
        type: 'document',
      })),
      ...workspace.collections.map(item => ({ ...item, type: 'collection' })),
    ] as ((Document | Collection) & {
      type: 'document' | 'collection';
    })[];
    tmpDocumentsAndCollections.sort((a, b) => {
      return b.created_at.getTime() - a.created_at.getTime();
    });

    const records = buildDocumentAndCollectionTree(tmpDocumentsAndCollections);

    return records;
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
    // const workspaces: workspaces[] = await prisma_client.$queryRaw`
    //   SELECT w.*
    //   FROM "workspaces" w
    //   LEFT JOIN "Collaborators" c ON w.id = c."workspaceId"
    //   WHERE c."workspaceId" IS NULL
    //   AND w."workspaceOwner" = ${userId}::uuid
    // `;

    const workspaces = await prisma_client.workspaces.findMany({
      where: {
        workspaceOwner: userId,
        collaborators: {
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
      INNER JOIN "collaborators" c ON c."userId" = u.id
      INNER JOIN "workspaces" w ON c."workspaceId" = w.id
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
      INNER JOIN "collaborators" c ON c."userId" = u.id
      INNER JOIN "workspaces" w ON c."workspaceId" = w.id
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
