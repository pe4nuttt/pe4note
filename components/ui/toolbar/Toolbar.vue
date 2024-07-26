<script setup lang="ts">
import { ToolbarRoot, useForwardProps } from 'radix-vue';
import type { ToolbarRootProps } from 'radix-vue';
import { type HTMLAttributes, computed } from 'vue';
import { cn } from '~/lib/utils';

const props = defineProps<
  ToolbarRootProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <ToolbarRoot
    :class="cn('flex p-1 !min-w-max rounded-md bg-popover border', props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </ToolbarRoot>
</template>

<style scoped></style>
