<script setup lang="ts">
import type { WithClassAsProps } from './interface';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from '@radix-icons/vue';
import { useCarousel } from './useCarousel';

const props = defineProps<WithClassAsProps>();

const { orientation, canScrollNext, scrollNext } = useCarousel();
</script>

<template>
  <Button
    :disabled="!canScrollNext"
    :class="
      cn(
        'touch-manipulation absolute h-8 w-8 rounded-full p-0 z-[1] opacity-0 transition-all group-hover:opacity-100',
        orientation === 'horizontal'
          ? '-right-4 top-1/2 -translate-y-1/2'
          : '-bottom-4 left-1/2 -translate-x-1/2 rotate-90',
        !canScrollNext && '!opacity-0',
        props.class,
      )
    "
    variant="outline"
    @click="scrollNext"
  >
    <slot>
      <ArrowRightIcon class="h-4 w-4 text-current" />
      <span class="sr-only">Next Slide</span>
    </slot>
  </Button>
</template>
