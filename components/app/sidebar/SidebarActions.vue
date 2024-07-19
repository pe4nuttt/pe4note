<template>
  <div class="flex mx-2 items-center justify-between">
    <Button variant="default">
      <Icon name="radix-icons:plus" size="18px" />
      <div class="ml-1">New Page</div>
    </Button>

    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          v-tooltip="'New Collection or Page'"
          variant="ghost"
          size="icon"
          class="text-muted-foreground"
        >
          <Icon
            name="ph:folder-simple-plus-fill"
            size="18px"
            color="currentColor"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="end" class="min-w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem @click="fnAddNewCollection">
            <div class="w-full flex items-start justify-between gap-2">
              <div class="top-[-2px] text-muted-foreground">
                <Icon
                  name="ph:folder-simple-fill"
                  size="18px"
                  color="currentColor"
                />
              </div>
              <div class="flex-1">
                <p class="font-medium">New Collection</p>
                <div class="text-muted-foreground text-[13px]">
                  Create Collection
                </div>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem @click="fnAddNewDocument">
            <div class="w-full flex items-start justify-between gap-2">
              <div class="top-[-2px] text-muted-foreground">
                <Icon name="ph:file-fill" size="18px" color="currentColor" />
              </div>
              <div class="flex-1">
                <p class="font-medium">New Document</p>
                <div class="text-muted-foreground text-[13px]">
                  Create Document
                </div>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Document, Collection } from '~/lib/services/service.type';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '~/components/ui/toast';
import { addNewDocument, addNewCollection } from '~/lib/datastore';

// Data
const { toast } = useToast();
const workspaceStore = useWorkspaceStore();
const user = useSupabaseUser();

// Methods
const fnAddNewCollection = async () => {
  if (!workspaceStore.workspace?.id) {
    return;
  }

  try {
    const payload: Collection = {
      id: uuidv4(),
      workspaceId: workspaceStore.workspace.id,
      bannerUrl: null,
      created_at: new Date(),
      data: null,
      iconId: '💼',
      inTrash: null,
      ownerId: user.value?.id as string,
      name: '',
    };

    await addNewCollection(payload);

    toast({
      title: 'Success',
      description: 'Added new Collection',
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

const fnAddNewDocument = async () => {
  if (!workspaceStore.workspace?.id) {
    return;
  }

  try {
    const payload: Document = {
      id: uuidv4(),
      workspaceId: workspaceStore.workspace.id,
      bannerUrl: null,
      created_at: new Date(),
      data: null,
      iconId: '🗒️',
      inTrash: null,
      ownerId: user.value?.id as string,
      collectionId: null,
      title: '',
      parentDocumentId: null,
    };

    await addNewDocument(payload);

    toast({
      title: 'Success',
      description: 'Added new Document',
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
</script>

<style scoped></style>
