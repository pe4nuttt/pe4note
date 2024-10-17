<template>
  <div>
    <!-- Banner -->
    <DocumentHeaderBanner />

    <div class="relative max-w-[var(--document-content-max-w)] mx-auto">
      <!-- Icon -->
      <DocumentHeaderIcon class="absolute -translate-y-1/2" />

      <!-- Document Controls -->
      <DocumentHeaderControls class="pt-[28px] -ml-2" />

      <!-- Document Info -->
      <DocumentHeaderInfo class="mt-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import DocumentHeaderIcon from './DocumentHeaderIcon';
import DocumentHeaderControls from './DocumentHeaderControls.vue';
import DocumentHeaderInfo from './DocumentHeaderInfo.vue';
import DocumentHeaderBanner from './DocumentHeaderBanner.vue';
</script>

<style scoped lang="scss"></style>
