<template>
  <ClientOnly>
    <Document />
  </ClientOnly>
</template>

<script setup lang="ts">
import Document from '@/components/pages/document';

const route = useRoute();

onMounted(() => {
  console.log('[OnMounted] documentId page');
});
</script>

<style scoped></style>
