<template>
  <div class="px-3 h-full flex flex-col">
    <!-- Topbar -->
    <HeaderTopbar />

    <div class="flex-1 overflow-hidden overflow-y-scroll mr-[-4px]">
      <!-- Header -->
      <Header />

      <!-- Main Page Content -->
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderTopbar from './HeaderTopbar.vue';
import Header from './Header.vue';

onMounted(() => {
});
</script>

<style scoped></style>
