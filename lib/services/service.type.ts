import { Prisma } from '@prisma/client';
import type {
  workspaces,
  documents,
  public_users,
  collections,
  subscriptions,
} from '@prisma/client';

// export const
// export const worksapce = Prisma.validator

export type {
  workspaces as Workspace,
  documents as Document,
  public_users as User,
  collections as Collection,
  subscriptions as Subscription,
};

// const user = Prisma.validator<Prisma.public_usersDefaultArgs>()({});

// export type User = Prisma.public_usersGetPayload<typeof user>;

export enum GetWorkspaceListType {
  ALL = 'all',
  SHARED = 'shared',
  PRIVATE = 'private',
  COLLABORATING = 'collaborating',
}

const workspaceWithCollectionDocuments =
  Prisma.validator<Prisma.workspacesDefaultArgs>()({
    include: {
      collections: {
        include: {
          documents: true,
        },
      },
      documents: true,
    },
  });

export type WorkspaceWithCollectionDocuments = Prisma.workspacesGetPayload<
  typeof workspaceWithCollectionDocuments
>;
