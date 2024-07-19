<template>
  <div
    :id="`sidebarItem__file-${props.item.id}`"
    :class="`flex items-center pr-2 py-[6px] group/sidebar-item hover:bg-muted rounded-md dark:text-muted-foreground dark:hover:text-white`"
    :style="{ 'padding-left': `${level * 8}px` }"
    @contextmenu="openFileContextMenu"
  >
    <!-- Icon -->
    <div class="mr-2 flex item-center justify-center">
      <span class="relative top-[-1px]">{{ item.iconId }}</span>
    </div>
    <!-- Title -->
    <div class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
      {{ item.title || 'Untitled' }}
    </div>

    <!-- Action -->
    <div
      class="ml-2 hidden group-hover/sidebar-item:inline-flex selection:cursor-pointer dark:text-muted-foreground items-center hover:bg-neutral-700 rounded-sm px-1"
      @click="openFileContextMenu"
    >
      <Icon name="lucide:ellipsis" color="currentColor" size="16px"></Icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { File } from '~/lib/services/service.type';

interface Props {
  item: File;
  level?: number;
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
});
const level = toRef(props, 'level');
const item = toRef(props, 'item');

// Store
const contextMenuStore = useContextMenuStore();

// Computed
const wrapperId = computed(() => {
  return 'sidebarItem__file-' + item.value.id;
});

// Methods
const openFileContextMenu = (e: MouseEvent) => {
  e.preventDefault();
  contextMenuStore.onDocumentContextMenu(e, props.item, wrapperId.value);
};
</script>

<style scoped></style>
