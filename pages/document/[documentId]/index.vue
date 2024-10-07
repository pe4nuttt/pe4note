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

const documentStore = useDocumentStore();
const { document } = storeToRefs(documentStore);
const { fetchCurrentDocument, closeDocument } = documentStore;
const { fetchCurrentWorkspace } = useWorkspaceStore();

const { refresh: refreshDocument } = await useAsyncData(
  'document',
  async () => {
    return fetchCurrentDocument(documentId as string)
      .then(() => true)
      .catch(error => {
        showError({
          status: 400,
          statusMessage: error,
        });
      });
  },
  {
    server: false,
  },
);

onBeforeMount(async () => {
  // try {
  //   await fetchCurrentDocument(documentId as string);
  //   // if (document?.workspaceId) {
  //   //   console.debug('[TEST] FETCH', document.workspaceId);
  //   //   fetchCurrentWorkspace(document.workspaceId);
  //   // }
  // } catch (error) {
  //   showError({
  //     status: 500,
  //     statusMessage: 'Something went wrong',
  //   });
  // }
});

onUnmounted(() => {});

watch(
  () => document.value?.workspaceId,
  () => {
    if (document.value?.workspaceId) {
      fetchCurrentWorkspace(document.value.workspaceId);
    }
  },
  {
    immediate: true,
  },
);

onMounted(async () => {
  await closeDocument();
});
</script>

<style scoped></style>
