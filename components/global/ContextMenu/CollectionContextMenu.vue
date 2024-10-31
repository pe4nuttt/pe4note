<template>
  <ContextMenu ref="collectionContextMenuRef" :model="items" @hide="onHide">
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
      name: collectionContextMenu?.collection?.title as string,
      iconId: collectionContextMenu?.collection?.iconId,
    }"
    :float-wrapper-id="renameFloatWrapperId"
    @submit="handleRenameFolder"
  />
</template>

<script setup lang="ts">
import ContextMenu from 'primevue/contextmenu';
import type { ContextMenuProps } from 'primevue/contextmenu';
import type { Document, Collection } from '~/lib/services/service.type';
import RenameDialog from '../RenameDialog.vue';
import { addNewCollection, updateCollectionTitleEmoji } from '~/lib/datastore';
import { useToast } from '~/components/ui/toast';
import { v4 as uuidv4 } from 'uuid';

const { toast } = useToast();
const contextMenuStore = useContextMenuStore();
const { collectionContextMenu } = storeToRefs(contextMenuStore);
const collectionContextMenuRef = ref();
const workspaceStore = useWorkspaceStore();
const user = useSupabaseUser();

// Data
const showRename = ref(false);
const renameFloatWrapperId = ref<string | null>(null);

watch(
  collectionContextMenu,
  value => {
    console.log('[WATCH] collectionContextMenu', value);
    if (value?.event && value?.collection) {
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
  console.log(
    '[FOLDER CONTEXT MENU]',
    event,
    collectionContextMenu.value?.collection,
  );
  collectionContextMenuRef.value.show(event);
};

const hide = () => {
  collectionContextMenuRef.value.hide();
};

const onHide = () => {
  // collectionContextMenu.value = {
  //   event: null,
  //   collection: null,
  // };
};

// Items Command
const handleOpenRenameDialog = (collection: Collection, wrapperId: string) => {
  console.log('[handleOpenRenameDialog]', collection, wrapperId);
  collectionContextMenu.value = {
    event: null,
    collection,
  };
  showRename.value = true;
  renameFloatWrapperId.value = wrapperId;

  // Get Folder sidebar ID ->
};

// const handleAddSubFolder = async () => {
//   if (!workspaceStore.workspace?.id) {
//     return;
//   }

//   try {
//     const payload: Collection = {
//       id: uuidv4(),
//       workspaceId: workspaceStore.workspace.id,
//       bannerUrl: null,
//       created_at: new Date(),
//       data: null,
//       iconId: '💼',
//       inTrash: null,
//       ownerId: user.value?.id as string,
//       parentcollectionId: collectionContextMenu.value?.folder?.id as string,
//       title: '',
//     };

//     // await addNewCollection(payload);
//     await workspaceStore.handleCreateNewFolder(payload);

//     toast({
//       title: 'Success',
//       description: 'Added new Folder',
//       variant: 'success',
//     });
//   } catch (error) {
//     toast({
//       title: 'Error',
//       description:
//         error instanceof Error ? error.message : 'Something went wrong',
//       variant: 'destructive',
//     });
//   }
// };

const handleAddSubDocument = async () => {
  if (!workspaceStore.workspace.data?.id) {
    return;
  }
  try {
    const payload: Document = {
      id: uuidv4(),
      workspaceId: workspaceStore.workspace.data?.id,
      bannerUrl: null,
      created_at: new Date(),
      data: null,
      iconId: '🗒️',
      inTrash: null,
      ownerId: user.value?.id as string,
      collectionId: collectionContextMenu.value?.collection?.id as string,
      title: '',
      parentDocumentId: null,
    };
    await workspaceStore.handleCreateNewDocument(payload);

    toast({
      title: 'Success',
      description: 'Added new document',
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
  const collectionId = collectionContextMenu.value?.collection?.id;
  if (collectionId) {
    try {
      const res = await updateCollectionTitleEmoji({
        collectionId: collectionId,
        newEmoji: value.emoji,
        newTitle: value.title,
      });
      // Update data
      if (res) {
        workspaceStore.updateWorkspaceRecord(
          collectionId,
          res as Collection,
          'collection',
        );
      }
      // workspaceStore.updateWorkspaceFolder(collectionId, res);
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
  // {
  //   label: 'New Folder',
  //   icon: 'ph:folder-simple-plus-fill',
  //   command: () => {
  //     handleAddSubFolder();
  //   },
  // },
  {
    label: 'Rename',
    icon: 'ph:pencil-simple-fill',
    command: () =>
      handleOpenRenameDialog(
        collectionContextMenu.value?.collection as Collection,
        collectionContextMenu.value?.wrapperId as string,
      ),
  },
  {
    label: 'New document',
    icon: 'ph:file-plus-fill',
    command: () => {
      handleAddSubDocument();
    },
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
