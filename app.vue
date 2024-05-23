<template>
  <NuxtLoadingIndicator />
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
      <Toaster />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import './assets/styles/style.scss';
import Toaster from '@/components/ui/toast/Toaster.vue';
</script>
