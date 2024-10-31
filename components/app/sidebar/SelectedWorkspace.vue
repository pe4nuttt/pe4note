<template>
  <div>
    <!-- class="flex rounded-md bg-transparent hover:bg-accent transition-all flex-row p-2 gap-4 justify-center cursor-pointer items-center my-2" -->
    <nuxt-link
      :class="
        cn(
          buttonVariants({ variant: 'ghost', size: 'default' }),
          'flex w-full h-10 justify-start items-center dark:text-white bg-tab-bg-color hover:bg-muted',
        )
      "
      :to="`/dashboard/${workspace.id}`"
    >
      <div class="flex items-center flex-1 overflow-hidden">
        <NuxtImg
          :src="workspaceLogo"
          alt="workspace logo"
          :width="20"
          :height="20"
          objectFit="cover"
        />
        <p
          class="ml-3 text-left flex-1 text-base overflow-hidden overflow-ellipsis whitespace-nowrap"
        >
          {{ workspace.title }}
        </p>
      </div>
      <Icon name="ion:chevron-expand-outline" class="text-foreground"></Icon>
    </nuxt-link>
    <!-- {{ Workspace }} -->
  </div>
</template>

<script setup lang="ts">
import type { Workspace } from '~/lib/services/service.type';
import type { AppWorkspaceType } from '~/lib/types';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  workspace: Workspace;
}

const { workspace } = defineProps<Props>();

const supabase = useSupabaseClient();

// Data

// Computed
const workspaceLogo = computed(() => {
  // if (Workspace.logo) {
  //   const path = supabase.storage
  //     .from('Workspace-logos')
  //     .getPublicUrl(Workspace.logo)?.data.publicUrl;
  //   console.log('[LOGO]', path);
  //   return path;
  // }

  return './cypresslogo.svg';
});
</script>

<style scoped></style>
