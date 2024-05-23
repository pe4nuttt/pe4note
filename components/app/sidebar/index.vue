<template>
  <div class="p-4">
    <div>
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
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Workspace } from '~/lib/services/service.type';
import WorkspaceDropdown from './WorkspaceDropdown.vue';
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
