<template>
  <ClientOnly>
    <Document />
  </ClientOnly>
</template>

<script setup lang="ts">
import Document from '@/components/pages/document';

const route = useRoute();
const documentId = route.params.documentId;
// const documentId = '24f6c494-53f3-403e-9b4a-f78ed19df7fd';

const { document, fetchCurrentDocument } = useDocumentStore();
const { fetchCurrentWorkspace } = useWorkspaceStore();

onBeforeMount(async () => {
  try {
    await fetchCurrentDocument(documentId as string);

    if (document?.workspaceId) {
      console.debug('[TEST] FETCH', document.workspaceId);
      fetchCurrentWorkspace(document.workspaceId);
    }
  } catch (error) {}
});

onMounted(() => {});
</script>

<style scoped></style>
