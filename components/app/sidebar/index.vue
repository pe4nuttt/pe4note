<template>
  <div class="py-4 flex flex-col">
    <div class="flex-1 flex flex-col overflow-hidden">
      <WorkspaceDropdown
        :privateWorkspaces="(workspaceListStore.privateWorkspaces as Workspace[])"
        :collaboratingWorkspaces="(workspaceListStore.collaboratingWorkspaces as Workspace[])"
        :sharedWorkspaces="(workspaceListStore.sharedWorkspaces as Workspace[])"
        :defaultWorkspace="
          workspaceId
            ? [
                ...workspaceListStore.privateWorkspaces,
                ...workspaceListStore.collaboratingWorkspaces,
                ...workspaceListStore.sharedWorkspaces,
              ].find(item => item.id === workspaceId)
            : null
        "
        class="px-2"
      />
      <PlanUsage class="mt-4 px-2 text-sm" :subscription="subscriptionData" />

      <NativeNavigation class="mt-4 px-2 text-sm" />

      <div class="pl-3 mt-2 mb-1 text-sm text-muted-foreground">Pages</div>
      <ScrollArea class="w-full rounded-md flex-1">
        <SidebarNavigation class="px-2 text-sm flex-1 flex overflow-hidden" />
      </ScrollArea>
    </div>

    <!-- Action -->
    <SidebarActions />
  </div>
</template>

<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Workspace } from '~/lib/services/service.type';
import WorkspaceDropdown from './WorkspaceDropdown.vue';
import PlanUsage from './PlanUsage.vue';
import SidebarActions from './SidebarActions.vue';
import SidebarNavigation from './SidebarNavigation/index.vue';
import NativeNavigation from './NativeNavigation.vue';
interface Props {
  workspaceId: string;
}

const props = defineProps<Props>();

const { apiFetch } = useBaseFetch();
// user
const userStore = useUserStore();
const userId = computed(() => {
  return userStore.user?.id || '';
});

const workspaceListStore = useWorkspaceListStore();

useAsyncData(
  'workspaceList',
  () => workspaceListStore.fetchWorkspaces().then(() => true),
  {
    watch: [userId],
  },
);

// subscription status
const { data: subscriptionData, error: subscriptionError } = useAsyncData(
  () => getUserSubscriptionStatus(userId.value),
  {
    watch: [userId],
  },
);

// folders
const { data: workspaceFolders, error: foldersError } = useAsyncData(() =>
  getWorkspaceFoldersApi(props.workspaceId),
);

if (subscriptionError || foldersError) {
  // navigateTo('/dashboard');
}
// error
// get all different workspaces (private, collaborating, shared)
// await useAsyncData('workspaces', () =>
//   workspaceListStore.fetchWorkspaces().then(() => true),
// );

// WATCH
watch(
  [
    workspaceListStore.privateWorkspaces,
    workspaceListStore.sharedWorkspaces,
    workspaceListStore.collaboratingWorkspaces,
  ],
  ([privateWorkspaces, sharedWorkspaces, collaboratingWorkspaces]) => {
    console.log(
      '[WOKRSPACES STORE]',
      privateWorkspaces,
      sharedWorkspaces,
      collaboratingWorkspaces,
    );
  },
  {
    deep: true,
  },
);

// onMounted(() => {
//   workspaceListStore.fetchWorkspaces();
// });
</script>

<style scoped></style>
