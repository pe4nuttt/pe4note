import prisma_client from '~/prisma/prisma.client';

export default defineEventHandler(async event => {
  const users = await prisma_client.public_users.findMany();
  return {
    hello: 'world',
    users,
  };
});
