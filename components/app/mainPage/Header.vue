<template>
  <div>
    <HeaderBanner />

    <div class="relative max-w-[var(--document-content-max-w)] mx-auto">
      <HeaderIcon class="absolute -translate-y-1/2" />

      <HeaderControls class="pt-[28px] -ml-2" />

      <HeaderInfo class="mt-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderIcon from './HeaderIcon.vue';
import HeaderControls from './HeaderControls.vue';
import HeaderInfo from './HeaderInfo.vue';
import HeaderBanner from './HeaderBanner.vue';
</script>

<style scoped lang="scss"></style>
