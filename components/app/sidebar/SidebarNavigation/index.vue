<template>
  <div class="flex flex-col gap-1">
    <SidebarItem
      v-for="folder in workspace?.folders"
      :key="folder.id"
      :item="folder"
    />
  </div>
</template>

<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area';
import SidebarItem from './SidebarItem.vue';
const workspaceStore = useWorkspaceStore();
const { workspace } = storeToRefs(workspaceStore);

watch(workspace, val => {
  console.log('[SIDEBAR Navigation]', val);
});
</script>

<style scoped></style>
