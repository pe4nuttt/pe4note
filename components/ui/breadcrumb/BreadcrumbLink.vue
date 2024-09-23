<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>(),
  {
    as: 'a',
  },
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        'transition-colors text-foreground hover:text-foreground hover:bg-muted rounded-[3px] px-1',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>
