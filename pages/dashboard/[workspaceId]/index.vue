<template>
  <div class="px-14 h-full flex flex-col gap-6">
    <div class="mt-10 text-3xl font-medium text-center">
      Good {{ textTime }}, {{ user?.full_name }}
    </div>

    <div class="flex flex-col gap-10">
      <div>
        <div class="flex gap-2 items-center h-12">
          <Icon name="lucide:clock-3" size="16px" />
          <span class="text-sm font-medium">Recently visited</span>
        </div>
        <RecentlyVisitedCarousel />
      </div>
      <div>
        <div class="flex gap-2 items-center h-12">
          <Icon name="lucide:clock-3" size="16px" />
          <span class="text-sm font-medium">Recently visited</span>
        </div>
        <RecentlyVisitedCarousel />
      </div>
    </div>
  </div>
</template>

<script setup>
import RecentlyVisitedCarousel from '~/components/pages/workspace/RecentlyVisitedCarousel.vue';

const route = useRoute();
const userStore = useUserStore();
const workspaceStore = useWorkspaceStore();

const { user } = storeToRefs(userStore);
const workspaceId = route.params.workspaceId;

const textTime = computed(() => {
  const hours = new Date().getHours();
  if (hours < 12) return 'morning';

  if (hours < 18) return 'afternoon';

  return 'evening';
});

watch(
  () => workspaceId,
  async val => {
    if (val) {
      workspaceStore.setCurrentWorkspaceId(workspaceId);
    }
  },
  {
    immediate: true,
    flush: 'sync',
  },
);

onMounted(() => {
  console.log('[OnMounted] workspaceId page');
});
</script>

<style lang="scss" scoped></style>
