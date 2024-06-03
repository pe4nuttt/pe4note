<template>
  <ContextMenu ref="folderContextMenuRef" :model="items" @hide="onHide">
    <template #itemicon="{ item }">
      <Icon
        v-if="item.icon"
        :name="item.icon"
        color="currentColor"
        size="18px"
      ></Icon>
    </template>
  </ContextMenu>
  <RenameDialog
    v-model="showRename"
    :data="{
      name: folderContextMenu?.folder?.title,
      iconId: folderContextMenu?.folder?.iconId,
    }"
    :float-wrapper-id="renameFloatWrapperId"
    @submit="handleRenameFolder"
  />
</template>

<script setup lang="ts">
import ContextMenu from 'primevue/contextmenu';
import type { ContextMenuProps } from 'primevue/contextmenu';
import type { Folder } from '~/lib/services/service.type';
import RenameDialog from '../RenameDialog.vue';

const contextMenuStore = useContextMenuStore();
const { folderContextMenu } = storeToRefs(contextMenuStore);
const folderContextMenuRef = ref();

// Data
const showRename = ref(false);
const renameFloatWrapperId = ref<string | null>(null);

watch(
  folderContextMenu,
  value => {
    console.log('[WATCH] folderContextMenu', value);
    if (value?.event && value?.folder) {
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
  event.preventDefault();
  console.log('[FOLDER CONTEXT MENU]', event, folderContextMenu.value?.folder);
  folderContextMenuRef.value.show(event);
};

const hide = () => {
  folderContextMenuRef.value.hide();
};

const onHide = () => {
  // folderContextMenu.value = {
  //   event: null,
  //   folder: null,
  // };
};

// Items Command
const handleOpenRenameDialog = (folder: Folder, wrapperId: string) => {
  console.log('[handleOpenRenameDialog]', folder, wrapperId);
  folderContextMenu.value = {
    event: null,
    folder,
  };
  showRename.value = true;
  renameFloatWrapperId.value = wrapperId;

  // Get Folder sidebar ID ->
};

const handleRenameFolder = (value: { emoji: ''; title: '' }) => {
  alert(JSON.stringify(value));
};

const items = ref<ContextMenuProps['model']>([
  {
    label: 'New File',
    icon: 'ph:file-plus-fill',
  },
  {
    label: 'New Folder',
    icon: 'ph:folder-simple-plus-fill',
  },
  {
    label: 'Rename',
    icon: 'ph:pencil-simple-fill',
    command: () =>
      handleOpenRenameDialog(
        folderContextMenu.value?.folder as Folder,
        folderContextMenu.value?.wrapperId as string,
      ),
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

defineExpose({
  show,
  hide,
});
</script>

<style scoped></style>
