import { Prisma } from '@prisma/client';
import type { Workspaces, Files, public_users, Folders } from '@prisma/client';

// export const
// export const worksapce = Prisma.validator

export type {
  Workspaces as Workspace,
  Files as File,
  public_users as User,
  Folders as Folder,
};

// const user = Prisma.validator<Prisma.public_usersDefaultArgs>()({});

// export type User = Prisma.public_usersGetPayload<typeof user>;

export enum GetWorkspaceListType {
  ALL = 'all',
  SHARED = 'shared',
  PRIVATE = 'private',
  COLLABORATING = 'collaborating',
}
