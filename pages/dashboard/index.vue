<template>
  <div></div>
</template>

<script setup lang="ts">
import type { Workspace } from '~/lib/services/service.type';

const { apiFetch } = useBaseFetch();
const supabaseClient = useSupabaseClient();
const user = useSupabaseUser();

// Data
const workspace = ref(null);

// Methods
const getWorkspace = async (uid: string) => {
  try {
    const { data, error } = await supabaseClient
      .from('workspaces')
      .select()
      .eq('workspaceOwner', uid);
    console.log('getWorkspace', data);

    if (data?.length) {
      const workspaceId = (data[0] as Workspace).id;

      navigateTo(`/dashboard/${workspaceId}`);
    } else {
      navigateTo(`/dashboard/setup`);
    }
  } catch (error) {}
};

// Watch
watch(
  () => user.value?.id,
  uid => {
    if (uid) {
      getWorkspace(uid);
    }
  },
  {
    immediate: true,
  },
);
</script>

<style scoped></style>
