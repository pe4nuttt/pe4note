import { DocumentService } from '~/lib/services/document.service';

export default defineEventHandler(async event => {
  const documentId = getRouterParam(event, 'documentId');

  if (!documentId) {
    throw createError({
      status: 400,
      message: 'Bad Request',
    });
  }

  const uid = event.context.user.id as string;

  const document = await DocumentService.getDocument(uid, documentId);

  if (!document)
    throw createError({
      status: 404,
      message: 'Document not found',
    });

  return document;
});
