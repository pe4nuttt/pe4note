<template>
  <div></div>
</template>

<script setup lang="ts">
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
      await refreshNuxtData('currentWorkspaceData');
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
      await refreshNuxtData('currentWorkspaceData');
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
