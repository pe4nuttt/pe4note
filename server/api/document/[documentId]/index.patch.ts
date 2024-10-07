import { DocumentService } from '~/lib/services/document.service';
import * as z from 'zod';
import { Document } from '~/lib/services/service.type';

const UpdateDocumentSchema = z.object({
  title: z.string().nullish(),
  iconId: z.string().nullish(),
  bannerUrl: z.string().nullish(),
});

export default defineEventHandler(async event => {
  const resBody = await readValidatedBody(event, body => {
    return UpdateDocumentSchema.safeParse(body);
  });
  const documentId = getRouterParam(event, 'documentId');

  if (!documentId) {
    throw createError({
      statusCode: 400,
      message: 'Bad request',
    });
  }

  if (!resBody.success) {
    throw createError({
      statusCode: 400,
      message: 'Bad request',
    });
  }

  const uid = event.context.user.id as string;

  const document = await DocumentService.updateDocument(
    uid,
    documentId,
    resBody.data as Partial<Document>,
  );

  return {
    data: document,
  };
});
