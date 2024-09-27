<template>
  <div class="px-3">
    <!-- Topbar -->
    <DocumentTopbar />

    <!-- Document Header -->
    <DocumentHeader />

    <!-- Document Content -->
    <DocumentEditor />
  </div>
</template>

<script setup lang="ts">
import DocumentTopbar from './DocumentTopbar.vue';
import DocumentHeader from './DocumentHeader.vue';
import DocumentEditor from './DocumentEditor.vue';

interface Props {
  document: Document;
}

const props = defineProps<Props>();

onMounted(() => {
  console.log('[onMounted] document content');
});
</script>

<style scoped></style>
