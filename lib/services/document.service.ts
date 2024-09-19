import prisma_client from '~/prisma/prisma.client';

export namespace DocumentService {
  export async function getNestedDocuments(
    workspaceId: string,
    parentDocumentId: string,
  ) {}

  export async function getDocument(uid: string, documentId: string) {
    try {
      // const document = await prisma_client.documents.findUnique({
      //   where: {
      //     id: documentId,
      //     OR: [
      //       {
      //         ownerId: uid,
      //       },
      //       {
      //         document_permissions: {
      //           some: {
      //             user_id: uid,
      //             // permission_type: {
      //             //   not: null,
      //             // }
      //           },
      //         },
      //       },
      //     ],
      //   },
      // });
      const document = await prisma_client.documents.findUnique({
        where: {
          id: documentId,
        },
      });

      if (document.ownerId !== uid) return document;
    } catch (error) {
      throw error;
      // throw createError({
      //   status: 404,
      //   message: 'Document not found',
      // });
    }
  }
}
