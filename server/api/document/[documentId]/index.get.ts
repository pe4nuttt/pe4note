import { DocumentService } from '~/lib/services/document.service';
import * as z from 'zod';
export default defineEventHandler(async event => {
  const documentId = getRouterParam(event, 'documentId');

  if (!documentId) {
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

  const document = await DocumentService.getDocument(uid, documentId, select);

  if (!document)
    throw createError({
      status: 404,
      message: 'Document not found',
    });

  return {
    data: document,
  };
});
