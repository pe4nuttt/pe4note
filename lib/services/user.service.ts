import prisma_client from '~/prisma/prisma.client';

export namespace UserService {
  export async function getUserById(userId: string) {
    const user = await prisma_client.public_users.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
