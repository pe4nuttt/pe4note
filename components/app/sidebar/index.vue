<template>
  <div class="py-4 flex flex-col">
    <div class="flex-1 flex flex-col overflow-hidden mb-4">
      <WorkspaceDropdown
        :privateWorkspaces="workspaceListStore.privateWorkspaces as Workspace[]"
        :collaboratingWorkspaces="
          workspaceListStore.collaboratingWorkspaces as Workspace[]
        "
        :sharedWorkspaces="workspaceListStore.sharedWorkspaces as Workspace[]"
        :defaultWorkspace="
          workspace.data?.id
            ? [
                ...workspaceListStore.privateWorkspaces,
                ...workspaceListStore.collaboratingWorkspaces,
                ...workspaceListStore.sharedWorkspaces,
              ].find(item => item.id === workspace.data?.id)
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

    <DataListener />
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
import DataListener from './DataListener.vue';
interface Props {
  // workspaceId: string;
}

const props = defineProps<Props>();

const { apiFetch } = useBaseFetch();
const workspacestore = useWorkspaceStore();
// user
const userStore = useUserStore();
// const user = useSupabaseUser();
const userId = computed(() => {
  return userStore.user?.id || '';
  // return user.value?.id || '';
});

const { workspace } = storeToRefs(workspacestore);

const workspaceListStore = useWorkspaceListStore();

const { refresh: refreshWorkspaceList } = await useAsyncData(
  'workspaceList',
  async () => {
    return workspaceListStore
      .fetchWorkspaces()
      .then(() => true)
      .catch(error => alert(error));
  },
  {
    server: false,
  },
);

// subscription status
// const {
//   data: subscriptionData,
//   refresh: resetSubscriptionData,
//   error: subscriptionError,
// } = await useAsyncData(() => getUserSubscriptionStatus(userId.value));

// folders
const {
  data: workspaceFolders,
  refresh: resetWorkspaceFolders,
  error: foldersError,
} = await useAsyncData(
  () => getWorkspaceFoldersApi(workspace.value.data?.id as string),
  {
    watch: [() => workspace.value.data?.id],
  },
);

// if (subscriptionError || foldersError) {
//   navigateTo('/dashboard');
// }
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

// watch(
//   [userId],
//   async () => {
//     if (userId) {
//       await Promise.all([
//         // resetSubscriptionData(),
//         refreshWorkspaceList(),
//       ]);
//     }
//   },
//   {
//     immediate: true,
//   },
// );

// onMounted(() => {
//   workspaceListStore.fetchWorkspaces();
// });
</script>

<style scoped></style>
