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
      name: folderContextMenu?.folder?.title as string,
      iconId: folderContextMenu?.folder?.iconId,
    }"
    :float-wrapper-id="renameFloatWrapperId"
    @submit="handleRenameFolder"
  />
</template>

<script setup lang="ts">
import ContextMenu from 'primevue/contextmenu';
import type { ContextMenuProps } from 'primevue/contextmenu';
import type { File, Folder } from '~/lib/services/service.type';
import RenameDialog from '../RenameDialog.vue';
import { addNewFolder, updateFolderTitleEmoji } from '~/lib/datastore';
import { useToast } from '~/components/ui/toast';
import { v4 as uuidv4 } from 'uuid';

const { toast } = useToast();
const contextMenuStore = useContextMenuStore();
const { folderContextMenu } = storeToRefs(contextMenuStore);
const folderContextMenuRef = ref();
const workspaceStore = useWorkspaceStore();
const user = useSupabaseUser();

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

const handleAddSubFolder = async () => {
  if (!workspaceStore.workspace?.id) {
    return;
  }

  try {
    const payload: Folder = {
      id: uuidv4(),
      workspaceId: workspaceStore.workspace.id,
      bannerUrl: null,
      created_at: new Date(),
      data: null,
      iconId: '💼',
      inTrash: null,
      ownerId: user.value?.id as string,
      parentFolderId: folderContextMenu.value?.folder?.id as string,
      title: '',
    };

    // await addNewFolder(payload);
    await workspaceStore.handleCreateNewFolder(payload);

    toast({
      title: 'Success',
      description: 'Added new Folder',
      variant: 'success',
    });
  } catch (error) {
    toast({
      title: 'Error',
      description:
        error instanceof Error ? error.message : 'Something went wrong',
      variant: 'destructive',
    });
  }
};

const handleAddSubFile = async () => {
  if (!workspaceStore.workspace?.id) {
    return;
  }
  try {
    const payload: File = {
      id: uuidv4(),
      workspaceId: workspaceStore.workspace.id,
      bannerUrl: null,
      created_at: new Date(),
      data: null,
      iconId: '🗒️',
      inTrash: null,
      ownerId: user.value?.id as string,
      folderId: folderContextMenu.value?.folder?.id as string,
      title: '',
    };
    await workspaceStore.handleCreateNewFile(payload);

    toast({
      title: 'Success',
      description: 'Added new File',
      variant: 'success',
    });
  } catch (error) {
    toast({
      title: 'Error',
      description:
        error instanceof Error ? error.message : 'Something went wrong',
      variant: 'destructive',
    });
  }
};

const handleRenameFolder = async (value: { emoji: ''; title: '' }) => {
  const folderId = folderContextMenu.value?.folder?.id;
  if (folderId) {
    try {
      const res = await updateFolderTitleEmoji({
        folderId: folderId,
        newEmoji: value.emoji,
        newTitle: value.title,
      });
      // Update data
      // workspaceStore.updateWorkspaceFolder(folderId, res);
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

const items = ref<ContextMenuProps['model']>([
  {
    label: 'New File',
    icon: 'ph:file-plus-fill',
    command: () => {
      handleAddSubFile();
    },
  },
  {
    label: 'New Folder',
    icon: 'ph:folder-simple-plus-fill',
    command: () => {
      handleAddSubFolder();
    },
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
