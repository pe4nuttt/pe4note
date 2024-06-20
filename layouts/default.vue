<template>
  <!-- bg-[#27313d] -->
  <div
    id="app-panel"
    class="w-screen h-screen overflow-hidden flex flex-col bg-app-bg-color"
  >
    <div class="h-11">
      App Header
      <!-- <ColorMode /> -->
    </div>

    <ResizablePanelGroup
      id="default-layout-group"
      class="h-full"
      direction="horizontal"
    >
      <ResizablePanel
        id="default-layout-group__panel-1"
        :min-size="15"
        :max-size="30"
        :default-size="20"
      >
        <AppSidebar
          class="box-border h-full"
          :workspaceId="(route.params.workspaceId as string)"
        />
      </ResizablePanel>
      <ResizableHandle id="default-layout-group__resize-1" with-handle />
      <ResizablePanel
        id="default-layout-group__panel-2"
        class="p-2"
        :min-size="30"
        :default-size="80"
      >
        <div className="bg-background h-full w-full rounded-xl">
          <slot />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>

    <AppContextMenuWrapper />
  </div>
</template>

<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

const route = useRoute();
const workspaceStore = useWorkspaceStore();

const { refresh: refreshCurrentWorkspaceData } = await useAsyncData(
  'currentWorkspaceData',
  () =>
    workspaceStore
      .fetchCurrentWorkspace(route.params.workspaceId as string)
      .then(() => true),
  // {
  //   watch: [() => route.params.workspaceId],
  //   immediate: true,
  // },
);

watch(
  () => route.params.workspaceId,
  val => {
    // console.log('WATCH ROUTE PARAMS::', val);
    // if (val) {
    //   workspaceStore.fetchCurrentWorkspace(val as string);
    // }
    refreshCurrentWorkspaceData();
  },
  {
    immediate: true,
  },
);
</script>

<style scoped></style>
