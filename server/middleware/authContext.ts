import { serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async event => {
  if (!event.path.startsWith('/api')) {
    return;
  }

  let isAuth = false;
  const cookies = parseCookies(event);

  if (cookies) {
    const user = await serverSupabaseUser(event);

    if (user) {
      isAuth = true;
      event.context.user = user;
    }
  }

  if (!isAuth) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }
});
