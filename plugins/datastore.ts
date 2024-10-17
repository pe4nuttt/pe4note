import type { User } from '~/lib/services/service.type';
import axios from 'axios';
import type { Axios, AxiosRequestConfig } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import type { Database } from '~/lib/supabase/supabase.types';
import type { users_activity_logs } from '@prisma/client';
import moment from 'moment';

export default defineNuxtPlugin(() => {
  class DataStore {
    supabaseClient = useSupabaseClient<Database>();
    supabaseUser = useSupabaseUser();

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

    async uploadBannerImage(
      file: File,
      type: 'collection' | 'document',
      config?: AxiosRequestConfig,
    ) {
      const session = useSupabaseSession();
      const blob = new Blob([file], {
        type: file.type,
      });

      const formData = new FormData();
      formData.append('cacheControl', '3600');
      formData.append('upsert', 'false');
      formData.append('', blob);

      const appConfig = useRuntimeConfig();
      const supabaseHost = appConfig.public.supabase.url;

      const fileName =
        (type === 'collection' ? 'collection' : 'document') + uuidv4();

      console.log('[supabaseClient]', blob, session, this.supabaseClient);

      return axios.post(
        `${supabaseHost}/storage/v1/object/banners/${fileName}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // @ts-ignore
            ...this.supabaseClient.auth.headers,
            Authorization: 'Bearer ' + session.value?.access_token,
          },
          onUploadProgress: config?.onUploadProgress,
          onDownloadProgress: config?.onDownloadProgress,
        },
      );
    }

    async addUserActivityLog(
      payload: Omit<users_activity_logs, 'id' | 'user_id' | 'timestamp'>,
    ) {
      const uid = this.supabaseUser.value?.id;

      if (!uid) return;

      const { data, error } = await this.supabaseClient
        .from('users_activity_logs')
        .insert({
          ...payload,
          timestamp: moment().utc().format('YYYY-MM-DD HH:mm:ss.SSS+00'),
          user_id: uid,
        });

      if (error) {
        console.log('[ERROR] addUserActivityLog:', error);
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
