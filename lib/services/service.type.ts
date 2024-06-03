import { Prisma } from '@prisma/client';
import type {
  workspaces,
  files,
  public_users,
  folders,
  subscriptions,
} from '@prisma/client';

// export const
// export const worksapce = Prisma.validator

export type {
  workspaces as Workspace,
  files as File,
  public_users as User,
  folders as Folder,
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
