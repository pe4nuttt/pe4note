<template>
  <div class="flex flex-col gap-1">
    <SidebarItem
      v-for="record in workspace.records"
      :key="record.id"
      :item="record"
      :type="record.type"
    />
    <!-- <SidebarItem
      v-for="document in workspace?.documents"
      :key="document.id"
      :item="document"
      type="document"
    /> -->
    <!-- <Item v-for="file in workspace?.files" :key="file.id" :item="file" /> -->
  </div>
</template>

<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area';
import SidebarItem from './SidebarItem.vue';
import Item from './Item.vue';
const workspaceStore = useWorkspaceStore();
const { workspace } = storeToRefs(workspaceStore);

watch(workspace, val => {});
</script>

<style scoped></style>
