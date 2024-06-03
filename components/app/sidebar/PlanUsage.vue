<template>
  <article class="" v-if="subscription?.status !== 'active'">
    <div
      class="flex justify-between items-center gap-4 text-muted-foreground text-sm mb-2"
    >
      <div class="flex justify-between items-center gap-2">
        <AppDiamondIcon class="h-4 w-4" />
        <span>Free Plan</span>
      </div>

      <div>{{ usagePercentage }}% / 100%</div>
    </div>
    <Progress :model-value="usagePercentage" class="h-1" />
  </article>
</template>

<script setup lang="ts">
import { MAX_FOLDERS_FREE_PLAN } from '~/lib/constants';
import type { Subscription } from '~/lib/services/service.type';
import AppDiamondIcon from '@/components/icons/AppDiamondIcon';
import { Progress } from '@/components/ui/progress';

interface Props {
  subscription?: Subscription | null;
}

const props = defineProps<Props>();

// Data
const workspaceStore = useWorkspaceStore();

// Hooks
const usagePercentage = computed(() => {
  const foldersCount = workspaceStore.workspace?.folders?.length;
  if (!foldersCount) return 0;

  return Math.ceil((foldersCount / MAX_FOLDERS_FREE_PLAN) * 100);
});

// Methods
</script>

<style lang="scss" scoped></style>
