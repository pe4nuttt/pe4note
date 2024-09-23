<template>
  <!-- bg-[#27313d] -->
  <div
    id="app-panel"
    class="w-screen h-screen overflow-hidden flex flex-col bg-app-bg-color !bg-background"
  >
    <!-- <div class="h-11"> -->
    <AppHeader class="h-11" @toggle-collapse="handleToggleCollapse" />
    <!-- </div> -->

    <ResizablePanelGroup
      id="default-layout-group"
      class="h-full"
      direction="horizontal"
      @layout="layout = $event"
    >
      <ResizablePanel
        ref="panelRef"
        id="default-layout-group__panel-1"
        collapsible
        :min-size="15"
        :max-size="30"
        :default-size="20"
        :collapsed-size="0"
      >
        <AppSidebar class="box-border h-full" />
      </ResizablePanel>
      <ResizableHandle id="default-layout-group__resize-1" />
      <ResizablePanel
        id="default-layout-group__panel-2"
        class="p-2"
        :min-size="30"
        :default-size="80"
      >
        <div className="bg-tab-bg-color h-full w-full rounded-xl">
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
import AppHeader from '@/components/app/header/index.vue';
import type { SplitterPanel } from 'radix-vue';

const route = useRoute();
const workspaceStore = useWorkspaceStore();
const layout = useCookie<number[]>('splitter:layout');

const { refresh: refreshCurrentWorkspaceData } = await useAsyncData(
  'currentWorkspaceData',
  () =>
    workspaceStore
      .fetchCurrentWorkspace(route.params.workspaceId as string)
      .then(() => true)
      .catch(error => {}),
  // {
  //   watch: [() => route.params.workspaceId],
  //   immediate: true,
  // },
);
const panelRef = ref<InstanceType<typeof SplitterPanel>>();

watch(
  () => route.params.workspaceId,
  val => {
    // console.log('WATCH ROUTE PARAMS::', val);
    // if (val) {
    //   workspaceStore.fetchCurrentWorkspace(val as string);
    // }
    if (route.params.workspaceId) {
      refreshCurrentWorkspaceData();
    }
  },
  {
    immediate: true,
  },
);

// Methods
const handleToggleCollapse = () => {
  panelRef?.value?.isCollapsed
    ? panelRef?.value?.expand()
    : panelRef?.value?.collapse();
};
</script>

<style scoped></style>
