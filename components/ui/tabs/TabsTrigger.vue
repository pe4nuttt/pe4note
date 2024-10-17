<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'radix-vue';
import { cn } from '@/lib/utils';

const props = defineProps<
  TabsTriggerProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        `tab-trigger inline-flex items-center justify-center whitespace-nowrap rounded-md px-2
      py-1 my-1 text-sm font-medium ring-offset-background transition-all 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
      disabled:pointer-events-none disabled:opacity-50 
      text-muted-foreground
      hover:bg-accent data-[state=active]:text-foreground data-[state=active]:shadow`,
        props.class,
      )
    "
  >
    <span class="truncate">
      <slot />
    </span>
  </TabsTrigger>
</template>

<style lang="scss" scoped>
.tab-trigger {
  position: relative;

  &[data-state='active']::after {
    content: '';
    display: block;
    position: absolute;
    bottom: -4.8px;
    background-color: hsl(var(--foreground));
    width: calc(100% - 12px);
    height: 1.4px;
  }
}
</style>
