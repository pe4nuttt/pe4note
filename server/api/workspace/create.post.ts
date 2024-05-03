import { z } from 'zod';
import prisma_client from '~/prisma/prisma.client';
import { Workspaces } from '@prisma/client';

export default defineEventHandler(async event => {
  const resBody = await readValidatedBody(event, body => z.infer<Workspaces>.safeParse(body));

  if (!resBody.success) throw resBody.error.issues;

});
