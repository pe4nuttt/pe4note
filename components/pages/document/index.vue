<template>
  <div>
    <!-- Topbar -->
    <DocumentTopbar />

    <!-- Document Header -->

    <!-- Document Content -->
  </div>
</template>

<script setup lang="ts">
import DocumentTopbar from './DocumentTopbar.vue';

interface Props {
  document: Document;
}

const props = defineProps<Props>();

onMounted(() => {
  console.log('[onMounted] document content');
});
</script>

<style scoped></style>
