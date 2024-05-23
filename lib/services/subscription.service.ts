import prisma_client from '~/prisma/prisma.client';
import { z } from 'zod';
import type { CreateWorkspaceSchema } from '../types';
import type { Workspace } from './service.type';

export namespace SubscriptionService {
  export async function getUserSubscriptionStatus(uid: string) {
    const data = prisma_client.subscriptions.findFirst({
      where: {
        user_id: uid,
      },
    });

    return data;
  }
}
