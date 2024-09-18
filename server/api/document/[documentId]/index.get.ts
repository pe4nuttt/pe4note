export default defineEventHandler(async event => {
  const documentId = getRouterParam(event, 'documentId');

  if (!documentId) {
    throw createError({
      status: 400,
      message: 'Bad Request',
    });
  }


  
});
