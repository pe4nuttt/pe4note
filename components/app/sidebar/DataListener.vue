<template>
  <div></div>
</template>

<script setup lang="ts">
const supabaseClient = useSupabaseClient();

const workspaceListStore = useWorkspaceListStore();
const folderChangesChannel = supabaseClient
  .channel('folder-changes-channel')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'folders',
    },
    async payload => {
      console.log('[FOLDER REALTIME]', payload);
      // Update data
      await refreshNuxtData('currentWorkspaceData');
    },
  );

const fileChangesChannel = supabaseClient.channel('file-changes-channel').on(
  'postgres_changes',
  {
    event: '*',
    schema: 'public',
    table: 'files',
  },
  async payload => {
    console.log('[FILE REALTIME]', payload);
    // Update data
    await refreshNuxtData('currentWorkspaceData');
  },
);
onMounted(() => {
  folderChangesChannel.subscribe();
  fileChangesChannel.subscribe();
});

onUnmounted(() => {
  folderChangesChannel.unsubscribe();
  fileChangesChannel.unsubscribe();
});
</script>

<style scoped></style>
