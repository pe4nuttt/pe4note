import { CollectionService } from '~/lib/services/collection.service';

export default defineEventHandler(async event => {
  const collectionId = getRouterParam(event, 'collectionId');

  if (!collectionId) {
    throw createError({
      status: 400,
      message: 'Bad Request',
    });
  }

  const queryParams = getQuery(event);
  const select = queryParams?.select
    ? JSON.parse(queryParams.select as string)
    : undefined;

  const uid = event.context.user.id as string;

  const collection = await CollectionService.getCollection(
    uid,
    collectionId,
    select,
  );

  if (!collection) {
    throw createError({
      status: 404,
      message: 'Collection not found',
    });
  }

  return {
    data: collection,
  };
});
