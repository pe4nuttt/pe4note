<template>
  <ClientOnly>
    <Document />
  </ClientOnly>
</template>

<script setup lang="ts">
import Document from '@/components/pages/document';

const route = useRoute();
// const documentId = route.params.documentId;
const documentId = '24f6c494-53f3-403e-9b4a-f78ed19df7fd';

const { document, fetchCurrentDocument } = useDocumentStore();

onBeforeMount(async () => {
  try {
    fetchCurrentDocument(documentId as string);
  } catch (error) {}
  console.debug('[ROUTE]', route);
});

onMounted(() => {
  console.log('[OnMounted] documentId page');
});
</script>

<style scoped></style>
