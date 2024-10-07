<template>
  <div>
    <!-- Banner -->
    <img
      id="document-banner-wrapper"
      src="https://images.unsplash.com/photo-1546900703-cf06143d1239?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=3600"
      alt=""
      class="block max-h-[200px] w-full object-center object-cover rounded-[6px]"
      @mouseover="toggleHeaderControlsVisible(true)"
      @mouseleave="toggleHeaderControlsVisible(false)"
    />

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

// Methods
const toggleHeaderControlsVisible = (isVisible: boolean) => {
  const ele = document.querySelector('#document-header-controls');
  if (ele) {
    (ele as any).style.visibility = isVisible ? 'visible' : '';
  }
};
</script>

<style scoped lang="scss">
#document-banner-wrapper {
  &:hover {
    & + div {
      #document-header-controls {
        background-color: red;
        visibility: visible !important;
      }
    }
  }
}
</style>
