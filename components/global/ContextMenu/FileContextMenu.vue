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
  <RenameDialog
    v-model="showRename"
    :data="{
      name: fileContextMenu?.file?.title as string,
      iconId: fileContextMenu?.file?.iconId,
    }"
    :float-wrapper-id="renameFloatWrapperId"
    @submit="handleRenameFile"
  />
</template>

<script setup lang="ts">
import ContextMenu from 'primevue/contextmenu';
import type { ContextMenuProps } from 'primevue/contextmenu';
import RenameDialog from '../RenameDialog.vue';
import type { File } from '~/lib/services/service.type';
import { updateFile } from '~/lib/datastore';
import { useToast } from '~/components/ui/toast';

const { toast } = useToast();
const contextMenuStore = useContextMenuStore();
const { fileContextMenu } = storeToRefs(contextMenuStore);
const fileContextMenuRef = ref();

const showRename = ref(false);
const renameFloatWrapperId = ref<string | null>(null);

const items = ref<ContextMenuProps['model']>([
  {
    label: 'Rename',
    icon: 'ph:pencil-simple-fill',
    command: () =>
      handleOpenRenameDialog(
        fileContextMenu.value?.file as File,
        fileContextMenu.value?.wrapperId as string,
      ),
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
  // fileContextMenu.value = {
  //   event: null,
  //   file: null,
  // };
};

// Items Command
const handleOpenRenameDialog = (file: File, wrapperId: string) => {
  console.log('[handleOpenRenameDialog]', file, wrapperId);
  fileContextMenu.value = {
    event: null,
    file,
  };
  showRename.value = true;
  renameFloatWrapperId.value = wrapperId;
};

const handleRenameFile = async (value: { emoji: ''; title: '' }) => {
  const fileId = fileContextMenu.value?.file?.id;
  if (fileId) {
    try {
      const res = await updateFile({
        id: fileId,
        iconId: value.emoji,
        title: value.title,
      });
      // Update data
      // workspaceStore.updateWorkspaceFolder(fileId, res);
      console.log('[RES] ', res);
    } catch (error) {
      console.log('[ERROR] handleRenameFolder', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    }
  }
};

defineExpose({
  show,
});
</script>

<style scoped></style>
