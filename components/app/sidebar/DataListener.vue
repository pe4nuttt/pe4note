<template>
  <div></div>
</template>

<script setup lang="ts">
import { ASYNC_DATA_KEYS } from '~/lib/constants';

const supabaseClient = useSupabaseClient();

const workspaceListStore = useWorkspaceListStore();
const collectionChangesChannel = supabaseClient
  .channel('collection-changes-channel')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'collections',
    },
    async payload => {
      console.log('[COLLECTION REALTIME]', payload);
      // Update data
      await refreshNuxtData(ASYNC_DATA_KEYS.APP_WORKSPACE_DATA);
    },
  );

const documentChangesChannel = supabaseClient
  .channel('documents-changes-channel')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'documents',
    },
    async payload => {
      console.log('[DOCUMENT REALTIME]', payload);
      // Update data
      await refreshNuxtData(ASYNC_DATA_KEYS.APP_WORKSPACE_DATA);
    },
  );
onMounted(() => {
  collectionChangesChannel.subscribe();
  documentChangesChannel.subscribe();
});

onUnmounted(() => {
  collectionChangesChannel.unsubscribe();
  documentChangesChannel.unsubscribe();
});
</script>

<style scoped></style>
