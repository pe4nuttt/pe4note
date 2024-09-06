import { useUserStore } from '~/stores/user.store';
const whiteList = ['/auth/login', 'error', '/auth/confirm'];

export default defineNuxtRouteMiddleware((to, _from) => {
  console.debug('[MIDDLEWARE]', to, _from);

  // return;

  const user = useSupabaseUser();
  if (user.value) {
    if (to.fullPath === '/auth/login') {
      return navigateTo('/dashboard', {
        replace: true,
      });
    } else {
      const userStore = useUserStore();
      // Check user store & update
      if (!userStore.user) {
        userStore.init();
      }
      return;
    }
  }

  if (whiteList.includes(to.path)) {
    return;
  }
  return navigateTo('/auth/login', {
    replace: true,
  });
});
