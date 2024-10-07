import type { Prisma } from '@prisma/client';
import prisma_client from '~/prisma/prisma.client';
import * as z from 'zod';
import type { Document } from './service.type';
import type { v4 } from 'uuid';

export namespace DocumentService {
  export async function getNestedDocuments(
    workspaceId: string,
    parentDocumentId: string,
  ) {}

  export async function getDocument(
    uid: string,
    documentId: string,
    select?: Prisma.documentsSelect,
  ) {
    try {
      const document = await prisma_client.documents.findUnique({
        where: {
          id: documentId,
        },
        select: select || undefined,
      });

      if (!document) {
        throw createError({
          status: 404,
          message: 'Document not found',
        });
      }

      if (document.ownerId === uid) {
        return document;
      }
      const foundDocumentPermission =
        await prisma_client.document_permissions.findFirst({
          where: {
            document_id: documentId,
            user_id: uid,
          },
        });

      if (foundDocumentPermission) {
        return document;
      }

      throw createError({
        status: 401,
        message: 'Not have permission',
      });
    } catch (error) {
      throw error;
      // throw createError({
      //   status: 404,
      //   message: 'Document not found',
      // });
    }
  }

  export async function updateDocument(
    uid: string,
    documentId: string,
    data: Partial<Document>,
  ) {
    // Check permission

    // Update
    const document: Partial<Document> = await prisma_client.documents.update({
      where: {
        id: documentId,
      },
      data: data,
    });

    delete document.data;

    return document;
  }
}
