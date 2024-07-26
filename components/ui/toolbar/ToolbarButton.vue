<script setup lang="ts">
import { ToolbarButton, useForwardProps } from 'radix-vue';
import type { ToolbarButtonProps } from 'radix-vue';
import { type HTMLAttributes, computed } from 'vue';
import { cn } from '~/lib/utils';

const props = defineProps<
  ToolbarButtonProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <ToolbarButton :class="cn('', props.class)" v-bind="forwardedProps">
    <slot />
  </ToolbarButton>
</template>

<style scoped></style>
