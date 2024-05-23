import type { User } from '~/lib/services/service.type';

export default defineNuxtPlugin(() => {
  class DataStore {
    supabaseClient = useSupabaseClient();

    async getUsersFromSearch(emailKey: string): Promise<User[]> {
      if (!emailKey) return [];

      const { data, error } = await this.supabaseClient
        .from('users')
        .select()
        .ilike('email', `%${emailKey}%`);

      if (error) {
        console.log('[ERROR] getUsersFromSearch:', error);
        throw error;
      }

      return data;
    }
  }

  return {
    provide: {
      dataStore: new DataStore(),
    },
  };
});
