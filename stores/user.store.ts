import { defineStore } from 'pinia';
import type { User } from '~/lib/services/service.type';

export const useUserStore = defineStore('user', () => {
  const { apiFetch } = useBaseFetch();
  const supabaseSession = useSupabaseSession();

  const user = ref<User | null>(null);
  const session = computed(() => {
    return supabaseSession.value;
  });
  const isLoggedIn = computed(() => !!session);

  // Get user info
  const init = async () => {
    const supabaseUser = useSupabaseUser();
    const res = await $fetch(`/api/user/${supabaseUser.value?.id}`);
    user.value = res as User;
    console.debug('STORE::', user.value);
  };

  const signout = async () => {
    user.value = null;
  };

  return {
    user,
    session,
    isLoggedIn,
    init,
    signout,
  };
});
