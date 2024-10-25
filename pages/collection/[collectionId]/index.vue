<template>
  <ClientOnly>
    <AppMainPageWrapper>
      <div />
    </AppMainPageWrapper>
    <!-- <Document /> -->
  </ClientOnly>
</template>

<script setup lang="ts">
const { $dataStore } = useNuxtApp();
const route = useRoute();
const collectionId = route.params.collectionId;

const workspaceStore = useWorkspaceStore();
const collectionStore = useCollectionStore();
const { collection } = storeToRefs(collectionStore);
const { workspace } = storeToRefs(workspaceStore);
const { fetchCurrentCollection } = collectionStore;
const { fetchCurrentWorkspace } = workspaceStore;

const { refresh: refreshCollection } = await useAsyncData(
  'collection',
  async () => {
    return fetchCurrentCollection(collectionId as string)
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

const addAccessDocumentLog = () => {
  return $dataStore.addUserActivityLog({
    entity_id: collectionId as string,
    entity_type: 'collection',
    activity_type: 'view',
    details: null,
  });
};

watch(
  () => collection.value?.workspaceId,
  () => {
    if (
      collection.value?.workspaceId &&
      collection.value?.workspaceId !== workspace.value?.id
    ) {
      fetchCurrentWorkspace(collection.value.workspaceId);
    }
  },
  {
    immediate: true,
  },
);

onBeforeMount(async () => {
  try {
    const res = await addAccessDocumentLog();
    console.log('[addAccessDocumentLog] RES', res);
  } catch (error) {
    console.log('[addAccessDocumentLog] Error', error);
  }
});
</script>

<style scoped></style>
