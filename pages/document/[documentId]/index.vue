<template>
  <ClientOnly>
    <AppMainPageWrapper>
      <DocumentEditor />
    </AppMainPageWrapper>
    <!-- <Document /> -->
  </ClientOnly>
</template>

<script setup lang="ts">
// import Document from '@/components/pages/document';
import DocumentEditor from '~/components/pages/document/DocumentEditor.vue';

const { $dataStore } = useNuxtApp();
const route = useRoute();
const documentId = route.params.documentId;
// const documentId = '24f6c494-53f3-403e-9b4a-f78ed19df7fd';

const workspaceStore = useWorkspaceStore();
const documentStore = useDocumentStore();
const mainPageStore = useMainPageStore();
const { document } = storeToRefs(documentStore);
const { workspace } = storeToRefs(workspaceStore);
const { fetchCurrentDocument, closeDocument } = documentStore;
const { setCurrentWorkspaceId } = workspaceStore;

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
    lazy: true,
  },
);

const addAccessDocumentLog = () => {
  return $dataStore.addUserActivityLog({
    entity_id: documentId as string,
    entity_type: 'document',
    activity_type: 'view',
    details: null,
  });
};

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
  try {
    const res = await addAccessDocumentLog();
    console.log('[addAccessDocumentLog] RES', res);
  } catch (error) {
    console.log('[addAccessDocumentLog] Error', error);
  }
});

onUnmounted(() => {});

watch(
  () => document.value?.workspaceId,
  () => {
    if (
      document.value?.workspaceId &&
      document.value.workspaceId !== workspace.value.data?.id
    ) {
      setCurrentWorkspaceId(document.value.workspaceId);
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
