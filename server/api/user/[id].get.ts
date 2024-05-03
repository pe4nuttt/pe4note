import { UserService } from '~/lib/services/user.service';
import prisma_client from '~/prisma/prisma.client';

export default defineEventHandler(async event => {
  const userId = getRouterParam(event, 'id');

  if (!userId)
    throw createError({
      status: 400,
      message: 'Bad Request',
    });

  const user = await UserService.getUserById(userId);

  if (!user)
    throw createError({
      status: 404,
      message: 'User not found',
    });

  return user;
});
