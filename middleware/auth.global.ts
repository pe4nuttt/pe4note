import { useUserStore } from '~/stores/user.store';
const whiteList = ['/auth/login', 'error'];

export default defineNuxtRouteMiddleware((to, _from) => {
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

  if (whiteList.includes(to.fullPath)) {
    return;
  }

  return navigateTo('/auth/login', {
    replace: true,
  });

  // if (whiteList.includes(to.fullPath)) {
  //   if (user.value) {
  //     // console.log('WHITELIST::', user.value);
  //     return navigateTo('/dashboard', {
  //       replace: true,
  //     });
  //   }
  //   return;
  // }

  // if (!user.value) {
  //   return navigateTo('/auth/login', {
  //     replace: true,
  //   });
  // } else {
  //   // Store
  // }
});
