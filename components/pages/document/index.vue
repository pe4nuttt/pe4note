<template>
  <div class="px-3 h-full flex flex-col">
    <!-- Topbar -->
    <DocumentTopbar />

    <div class="flex-1 overflow-hidden overflow-y-scroll mr-[-4px]">
      <!-- Document Header -->
      <DocumentHeader />

      <!-- Document Content -->
      <DocumentEditor />
    </div>
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
