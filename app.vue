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
import './assets/styles/index.scss';
import 'primevue/resources/themes/aura-light-green/theme.css';
import Toaster from '@/components/ui/toast/Toaster.vue';
// import MyPrimeVuePreset from '~/assets/mypreset';

// const primevue = usePrimeVue();
// primevue.config.pt = MyPrimeVuePreset;
</script>
