import { CollectionService } from '~/lib/services/collection.service';
import * as z from 'zod';
import { Collection } from '~/lib/services/service.type';

const updateCollectionSchema = z.object({
  title: z.string().nullish(),
  iconId: z.string().nullish(),
  bannerUrl: z.string().nullish(),
});

export default defineEventHandler(async event => {
  const collectionId = getRouterParam(event, 'collectionId');

  if (!collectionId) {
    throw createError({
      statusCode: 400,
      message: 'Bad request',
    });
  }
  const resBody = await readValidatedBody(event, body => {
    return updateCollectionSchema.safeParse(body);
  });

  if (!resBody.success) {
    throw createError({
      statusCode: 400,
      message: 'Bad request',
    });
  }

  const uid = event.context.user.id as string;

  const collection = await CollectionService.updateCollection(
    uid,
    collectionId,
    resBody.data as Partial<Collection>,
  );

  return {
    data: collection,
  };
});
