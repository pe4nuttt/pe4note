<script setup lang="ts">
import type { WithClassAsProps } from './interface';
import { cn } from '@/lib/utils';
import { useCarousel } from './useCarousel';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<WithClassAsProps>();

const { carouselRef, orientation, canScrollNext, canScrollPrev } =
  useCarousel();
</script>

<template>
  <div
    ref="carouselRef"
    class="overflow-hidden"
    :style="{
      'mask-image': canScrollNext
        ? canScrollPrev
          ? 'linear-gradient(to right, transparent 0%, black 96px, black calc(100% - 96px), transparent 100%)'
          : 'linear-gradient(to left, transparent 0%, black 96px)'
        : canScrollPrev
          ? 'linear-gradient(to right, transparent 0%, black 96px)'
          : '',
    }"
  >
    <div
      :class="
        cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>
