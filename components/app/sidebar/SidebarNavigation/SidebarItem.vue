<template>
  <div>
    <div
      :id="`sidebarItem__folder-${props.item.id}`"
      :class="[
        `flex items-center pr-2 py-[6px] group/sidebar-item hover:!bg-muted rounded-md dark:text-muted-foreground`,
        {
          'bg-muted/40 folder-context-menu-opening': isOpenContextMenu,
        },
      ]"
      :style="{ 'padding-left': `${level * 8}px` }"
      @contextmenu="openFolderContextMenu"
    >
      <!-- Icon -->
      <div class="mr-2 flex item-center justify-center">
        <span class="group-hover/sidebar-item:hidden relative top-[-1px]">{{
          item.iconId
        }}</span>
        <span
          :class="
            cn(
              `dark:text-muted-foreground hidden group-hover/sidebar-item:inline-flex 
              transition-all hover:bg-neutral-700 rounded-sm cursor-pointer`,
              {
                'rotate-90': isOpened,
              },
            )
          "
          @click="isOpened = !isOpened"
        >
          <Icon
            name="lucide:chevron-right"
            color="currentColor"
            size="18px"
          ></Icon>
        </span>
      </div>
      <!-- Title -->
      <div class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {{ item.title || 'Untitled' }}
      </div>

      <!-- Action -->
      <div
        class="ml-2 hidden group-hover/sidebar-item:inline-flex selection:cursor-pointer dark:text-muted-foreground items-center hover:bg-neutral-700 rounded-sm px-1"
      >
        <Icon name="lucide:ellipsis" color="currentColor" size="16px"></Icon>
      </div>
    </div>
    <div v-show="isOpened">
      <!-- Sub Folder -->
      <div v-for="subFolder in item.folders" :key="subFolder.id" class>
        <AppSidebarSidebarNavigationSidebarItem
          :item="subFolder"
          :level="level + 1"
          :isShown="isOpened"
        ></AppSidebarSidebarNavigationSidebarItem>
      </div>

      <!-- Files -->
      <div v-for="file in item.files" :key="file.id">
        <Item :item="file" :level="level + 1" />
      </div>
    </div>

    <!-- <Test /> -->
  </div>
</template>

<script lang="ts">
export default {
  name: 'AppSidebarItem',
};
</script>
<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { File, Folder } from '~/lib/services/service.type';
import type { AppFolderType } from '~/lib/types';
import Item from './Item.vue';
import Test from '~/components/global/ContextMenu/Test.vue';

interface Props {
  item: AppFolderType;
  level?: number;
  isShown?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
  isShown: true,
});
const isShown = toRef(props, 'isShown');
const level = toRef(props, 'level');
const item = toRef(props, 'item');

// Store
const contextMenuStore = useContextMenuStore();

// Data
const isOpened = ref(false);

// Computed
const wrapperId = computed(() => {
  return 'sidebarItem__folder-' + item.value.id;
});

// Watch
watch(isShown, val => {
  if (!val) {
    isOpened.value = false;
  }
});

// Methods
const openFolderContextMenu = (e: MouseEvent) => {
  e.preventDefault();
  contextMenuStore.onFolderContextMenu(e, props.item, wrapperId.value);
};

const isOpenContextMenu = computed(() => {
  if (
    contextMenuStore.folderContextMenu?.folder?.id &&
    contextMenuStore.folderContextMenu.folder.id === props.item.id
  )
    return true;
  return false;
});

// Hooks
onUnmounted(() => {});
</script>

<style scoped></style>
