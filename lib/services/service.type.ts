import { Prisma } from '@prisma/client';
import type { Workspaces, Files, public_users } from '@prisma/client';

// export const
// export const worksapce = Prisma.validator

export type { Workspaces as Workspace, Files as File, public_users as User };

// const user = Prisma.validator<Prisma.public_usersDefaultArgs>()({});

// export type User = Prisma.public_usersGetPayload<typeof user>;
