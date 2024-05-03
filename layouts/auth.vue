<template>
  <div id="auth" class="w-screen h-screen overflow-hidden">
    <NightSkyBg />
    <div class="fixed">
      <ColorMode />
      AUTH layout
    </div>
    <div id="auth-wrapper" class="h-full w-full">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { nextTick } from 'vue';
import Button from '~/components/ui/button/Button.vue';
</script>

<style lang="scss" scoped></style>
