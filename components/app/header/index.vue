<template>
  <div
    class="app-header p-2 pb-0 grid items-center grid-cols-[0.5fr_1fr_0.5fr]"
  >
    <div class="app-header--left">
      <Button variant="ghost" size="icon" @click="toggleCollapse">
        <Icon
          name="solar:sidebar-minimalistic-bold"
          size="20px"
          class="text-muted-foreground rotate-180"
        />
      </Button>
    </div>
    <div class="app-header--center">
      <HeaderSearch />
    </div>
    <div class="app-header--right">Right</div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import HeaderSearch from './HeaderSearch.vue';

const emit = defineEmits<{
  toggleCollapse: [];
}>();

// Methods
const toggleCollapse = () => {
  emit('toggleCollapse');
};
</script>

<style lang="scss" scoped></style>
