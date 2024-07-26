<script setup lang="ts">
import { ToolbarToggleItem, useForwardProps } from 'radix-vue';
import type { ToolbarToggleItemProps } from 'radix-vue';
import { type HTMLAttributes, computed } from 'vue';
import { cn } from '~/lib/utils';

const props = defineProps<
  ToolbarToggleItemProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <ToolbarToggleItem
    :class="
      cn(
        `inline-flex justify-center flex-shrink-0 h-[25px] px-[5px] flex-grow-0 basis-auto cursor-default select-none items-center 
        rounded-sm text-sm font-medium outline-none hover:opacity-70 hover:bg-accent hover:text-accent-foreground hover:cursor-pointer hover: 
        data-[state=on]:bg-accent data-[state=on]:opacity-100 data-[state=on]:text-accent-foreground ml-0.5`,
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </ToolbarToggleItem>
</template>

<style scoped></style>
