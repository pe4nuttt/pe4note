<template>
  <div>
    <div
      :id="`sidebarItem__collection-${props.item.id}`"
      :class="[
        `flex items-center pr-2 py-[6px] group/sidebar-item hover:!bg-muted rounded-md dark:text-muted-foreground 
          dark:hover:text-white
        `,
        {
          'bg-muted/40 folder-context-menu-opening': isOpenContextMenu,
        },
      ]"
      :style="{ 'padding-left': `${level * 8}px` }"
      @contextmenu="onContextMenu"
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
        {{ title || 'Untitled' }}
      </div>

      <!-- Action -->
      <div
        class="ml-2 hidden group-hover/sidebar-item:inline-flex selection:cursor-pointer dark:text-muted-foreground items-center hover:bg-neutral-700 rounded-sm px-1"
        @click="onContextMenu"
      >
        <Icon name="lucide:ellipsis" color="currentColor" size="16px"></Icon>
      </div>
    </div>
    <div v-show="isOpened">
      <!-- Sub Documents -->
      <div v-for="subDocument in item.documents" :key="subDocument.id" class>
        <AppSidebarSidebarNavigationSidebarItem
          :item="subDocument"
          :level="level + 1"
          :isShown="isOpened"
          type="document"
        ></AppSidebarSidebarNavigationSidebarItem>
      </div>

      <!-- Files
      <div v-for="file in item.files" :key="file.id">
        <Item :item="file" :level="level + 1" />
      </div> -->
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
import type { AppCollectionType, AppDocumentType } from '~/lib/types';
import Item from './Item.vue';
import Test from '~/components/global/ContextMenu/Test.vue';

interface Props {
  item: AppCollectionType | AppDocumentType;
  level?: number;
  isShown?: boolean;
  type: 'collection' | 'document';
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
  isShown: true,
  type: 'document',
});
const isShown = toRef(props, 'isShown');
const level = toRef(props, 'level');
const item = toRef(props, 'item');

// Store
const contextMenuStore = useContextMenuStore();
const workspaceStore = useWorkspaceStore();

// Data
const isOpened = ref(false);

// Computed
const wrapperId = computed(() => {
  // return 'sidebarItem__folder-' + item.value.id;

  const prefix =
    props.type === 'document'
      ? 'sidebarItem__document-'
      : 'sidebarItem__collection-';

  return prefix + item.value.id;
});

const title = computed(() => {
  if (props.type === 'collection')
    return (item.value as AppCollectionType).name;

  return (item.value as AppDocumentType).title;
});

// Watch
watch(isShown, val => {
  if (!val) {
    isOpened.value = false;
  }
});
watch(
  () => [
    workspaceStore.recentAddedParentCollectionId,
    workspaceStore.recentAddedParentDocumentId,
  ],
  ([collectionId, documentId]) => {
    if (item.value.id === collectionId || item.value.id === documentId) {
      isOpened.value = true;
    }
  },
);

// Methods
const onContextMenu = (e: MouseEvent) => {
  e.preventDefault();
  if (props.type === 'collection') {
    contextMenuStore.onCollectionContextMenu(
      e,
      props.item as AppCollectionType,
      wrapperId.value,
    );
  } else {
    contextMenuStore.onDocumentContextMenu(
      e,
      props.item as AppDocumentType,
      wrapperId.value,
    );
  }
};

const isOpenContextMenu = computed(() => {
  if (
    props.type === 'collection' &&
    contextMenuStore.collectionContextMenu?.collection?.id &&
    contextMenuStore.collectionContextMenu.collection.id === props.item.id
  )
    return true;

  if (
    props.type === 'document' &&
    contextMenuStore.documentContextMenu?.document?.id &&
    contextMenuStore.documentContextMenu.document.id === props.item.id
  )
    return false;
});

// Hooks
onUnmounted(() => {});
</script>

<style scoped></style>
