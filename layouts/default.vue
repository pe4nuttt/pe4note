<template>
  <!-- bg-[#27313d] -->
  <div id="app-panel" class="w-screen h-screen overflow-hidden flex flex-col">
    <div>
      App Header
      <ColorMode />
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
        :min-size="30"
        :default-size="80"
      >
        <slot />
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
watch(
  () => route.params.workspaceId,
  val => {
    console.log('WATCH ROUTE PARAMS::', val);
    if (val) {
      workspaceStore.fetchCurrentWorkspace(val as string);
    }
  },
  {
    immediate: true,
  },
);
</script>

<style scoped></style>
