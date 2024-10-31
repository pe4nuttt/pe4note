<template>
  <ContextMenu ref="documentContextMenuRef" :model="items" @hide="onHide">
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
      name: documentContextMenu?.document?.title as string,
      iconId: documentContextMenu?.document?.iconId,
    }"
    :float-wrapper-id="renameFloatWrapperId"
    @submit="handleRenameDocument"
  />
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import ContextMenu from 'primevue/contextmenu';
import type { ContextMenuProps } from 'primevue/contextmenu';
import RenameDialog from '../RenameDialog.vue';
import type { Document } from '~/lib/services/service.type';
import { updateDocument } from '~/lib/datastore';
import { useToast } from '~/components/ui/toast';

const { toast } = useToast();
const user = useSupabaseUser();
const workspaceStore = useWorkspaceStore();
const contextMenuStore = useContextMenuStore();
const { documentContextMenu } = storeToRefs(contextMenuStore);
const documentContextMenuRef = ref();

const showRename = ref(false);
const renameFloatWrapperId = ref<string | null>(null);

const items = ref<ContextMenuProps['model']>([
  {
    label: 'Rename',
    icon: 'ph:pencil-simple-fill',
    command: () =>
      handleOpenRenameDialog(
        documentContextMenu.value?.document as Document,
        documentContextMenu.value?.wrapperId as string,
      ),
  },
  {
    label: 'New nested document',
    icon: 'ph:file-plus-fill',
    command: () => {
      handleAddSubDocument();
    },
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
  documentContextMenu,
  value => {
    console.log('[WATCH] documentContextMenu', value);
    if (value?.event && value?.document) {
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
  documentContextMenuRef.value.show(event);
};

const hide = () => {
  documentContextMenuRef.value.hide();
};

const onHide = () => {
  // documentContextMenu.value = {
  //   event: null,
  //   document: null,
  // };
};

// Items Command
const handleOpenRenameDialog = (document: Document, wrapperId: string) => {
  console.log('[handleOpenRenameDialog]', document, wrapperId);
  documentContextMenu.value = {
    event: null,
    document,
  };
  showRename.value = true;
  renameFloatWrapperId.value = wrapperId;
};

const handleRenameDocument = async (value: { emoji: ''; title: '' }) => {
  const documentId = documentContextMenu.value?.document?.id;
  if (documentId) {
    try {
      const res = await updateDocument({
        id: documentId,
        iconId: value.emoji,
        title: value.title,
      });
      // Update data
      if (res) {
        workspaceStore.updateWorkspaceRecord(
          documentId,
          res as Document,
          'document',
        );
      }
      // workspaceStore.updateWorkspaceFolder(documentId, res);
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
      collectionId: documentContextMenu.value?.document?.collectionId as string,
      title: '',
      parentDocumentId: documentContextMenu.value?.document?.id as string,
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

defineExpose({
  show,
});
</script>

<style scoped></style>
