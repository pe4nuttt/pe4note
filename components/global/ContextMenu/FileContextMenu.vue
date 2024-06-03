<template>
  <ContextMenu ref="fileContextMenuRef" :model="items" @hide="onHide">
    <template #itemicon="{ item }">
      <Icon
        v-if="item.icon"
        :name="item.icon"
        color="currentColor"
        size="18px"
      ></Icon>
    </template>
  </ContextMenu>
</template>

<script setup lang="ts">
import ContextMenu from 'primevue/contextmenu';
import type { ContextMenuProps } from 'primevue/contextmenu';

const contextMenuStore = useContextMenuStore();
const { fileContextMenu } = storeToRefs(contextMenuStore);
const fileContextMenuRef = ref();

const items = ref<ContextMenuProps['model']>([
  {
    label: 'Rename',
    icon: 'ph:pencil-simple-fill',
  },
  {
    label: 'Duplicate',
    icon: 'ph:copy-simple-fill',
  },
  {
    label: 'Move to',
    icon: 'ph:arrow-elbow-up-right-bold',
  },
  {
    label: 'Share',
    icon: 'ph:share-network-fill',
  },
  {
    label: 'Delete',
    icon: 'ph:trash-simple-fill',
    class: 'destructive-context-menu-item',
  },
]);

watch(
  fileContextMenu,
  value => {
    console.log('[WATCH] fileContextMenu', value);
    if (value?.event && value?.file) {
      show(value.event);
    } else {
      hide();
    }
  },
  {
    deep: true,
  },
);

// Methods
const show = (event: MouseEvent) => {
  fileContextMenuRef.value.show(event);
};

const hide = () => {
  fileContextMenuRef.value.hide();
};

const onHide = () => {
  fileContextMenu.value = {
    event: null,
    file: null,
  };
};

defineExpose({
  show,
});
</script>

<style scoped></style>
