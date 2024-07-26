<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { ToolbarSeparator, type ToolbarSeparatorProps } from 'radix-vue';
import { cn } from '@/lib/utils';

const props = defineProps<
  ToolbarSeparatorProps & {
    class?: HTMLAttributes['class'];
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ToolbarSeparator
    v-bind="delegatedProps"
    :class="cn('w-[1px] bg-muted', props.class)"
  />
</template>
