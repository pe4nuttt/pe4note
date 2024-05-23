import { SubscriptionService } from '~/lib/services/subscription.service';
import prisma_client from '~/prisma/prisma.client';

export default defineEventHandler(async event => {
  const userId = getRouterParam(event, 'id');

  if (!userId)
    throw createError({
      status: 400,
      message: 'Bad Request',
    });

  try {
    const data = await SubscriptionService.getUserSubscriptionStatus(userId);

    return {
      data,
    };
  } catch (error: any) {
    console.log('[ERROR] get user', error);
    throw createError({
      message: error?.message || error,
    });
  }
});
