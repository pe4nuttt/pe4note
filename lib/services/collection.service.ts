import type { Prisma } from '@prisma/client';
import prisma_client from '~/prisma/prisma.client';
import type { Collection } from './service.type';

export namespace CollectionService {
  export async function getCollection(
    uid: string,
    collectionId: string,
    select?: Prisma.collectionsSelect,
  ) {
    try {
      const collection = await prisma_client.collections.findUnique({
        where: {
          id: collectionId,
        },
        select: select || undefined,
      });

      if (!collection) {
        throw createError({
          status: 404,
          message: 'Collection not found',
        });
      }

      if (collection.ownerId === uid) {
        return collection;
      }

      const foundCollectionPermission =
        await prisma_client.collection_permissions.findFirst({
          where: {
            collection_id: collectionId,
            user_id: uid,
          },
        });

      if (foundCollectionPermission) {
        return collection;
      }

      throw createError({
        status: 401,
        message: 'Not have permission',
      });
    } catch (error) {
      throw error;
    }
  }

  export async function updateCollection(
    uid: string,
    collectionId: string,
    data: Partial<Collection>,
  ) {
    // Check permission

    // Update
    const collection: Partial<Collection> =
      await prisma_client.collections.update({
        where: {
          id: collectionId,
        },
        data,
      });

    return collection;
  }
}
