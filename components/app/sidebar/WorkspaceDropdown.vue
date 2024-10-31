<template>
  <div class="relative">
    <div>
      <Popover>
        <PopoverTrigger class="w-full">
          <span class="w-full">
            <SelectedWorkspace
              v-if="defaultWorkspace"
              :workspace="defaultWorkspace"
            >
            </SelectedWorkspace>
            <template v-else>Select a workspace</template>
          </span>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          :class="
            cn(`
                rounded-md
                shadow-md
                bg-black/10
                backdrop-blur-lg
                group
                border-[1px]
                border-muted
                p-0
                `)
          "
        >
          <ScrollArea
            :class="cn(`w-full max-w-[320px] min-w-[280px] h-[190px] py-3`)"
          >
            <div class="flex flex-col gap-2">
              <p
                v-if="privateWorkspaces && privateWorkspaces.length"
                class="text-muted-foreground pl-3 text-sm"
              >
                Private
              </p>
              <WorkspaceDropdownItem
                v-for="workspace in privateWorkspaces"
                :key="workspace.id"
                :workspace="workspace"
              />
              <p
                v-if="sharedWorkspaces && sharedWorkspaces.length"
                class="text-muted-foreground pl-3 text-sm"
              >
                Shared
              </p>
              <WorkspaceDropdownItem
                v-for="workspace in sharedWorkspaces"
                :key="workspace.id"
                :workspace="workspace"
              />
              <p
                v-if="collaboratingWorkspaces && collaboratingWorkspaces.length"
                class="text-muted-foreground pl-3 text-sm"
              >
                Collaborating
              </p>
              <WorkspaceDropdownItem
                v-for="workspace in collaboratingWorkspaces"
                :key="workspace.id"
                :workspace="workspace"
              />
            </div>

            <!-- Create Workspace Button -->
            <Dialog v-model:open="isShowCreatorDialog">
              <DialogTrigger class="w-full mt-1">
                <div
                  class="flex transition-all hover:bg-muted justify-center items-center gap-2 p-2 w-full"
                >
                  <span>+</span>
                  <span>Create workspace</span>
                </div>
              </DialogTrigger>
              <DialogContent
                class="block h-screen sm:h-auto sm:max-h-[600px] w-full"
              >
                <DialogHeader>
                  <DialogTitle>Create A Workspace</DialogTitle>
                  <DialogDescription>
                    Workspaces give you the power to collaborate with others.
                    You can change your workspace privacy settings after
                    creating the workspace too.
                  </DialogDescription>
                </DialogHeader>
                <WorkspaceCreator @close="isShowCreatorDialog = false" />
              </DialogContent>
            </Dialog>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>

    <!-- Dropdown wrapper -->
  </div>
</template>

<script setup lang="ts">
import type { Workspace } from '~/lib/services/service.type';
import SelectedWorkspace from './SelectedWorkspace.vue';
import type { AppWorkspaceType } from '~/lib/types';
import WorkspaceDropdownItem from './WorkspaceDropdownItem.vue';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import WorkspaceCreator from '../WorkspaceCreator.vue';

interface Props {
  privateWorkspaces: Workspace[];
  collaboratingWorkspaces: Workspace[];
  sharedWorkspaces: Workspace[];
  defaultWorkspace?: Workspace | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:defaultWorkspace': [Value: Workspace];
}>();

// Data
const isShowDropdown = ref(false);
const isShowCreatorDialog = ref(false);

// Methods

//
</script>

<style scoped></style>
