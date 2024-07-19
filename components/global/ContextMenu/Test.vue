<template>
  <div>
    <button class="" @contextmenu="onContextMenuFolder">
      Context folder test
    </button>
    <CollectionContextMenu ref="folderContextRef" />
    <button class="" @contextmenu="onContextMenuFile">Context file test</button>
    <DocumentContextMenu ref="fileContextRef" />
  </div>
</template>

<script setup lang="ts">
import ContextMenu from './index.vue';
import CollectionContextMenu from './CollectionContextMenu.vue';
import DocumentContextMenu from './DocumentContextMenu.vue';

const folderContextRef = ref();
const fileContextRef = ref();

// Methods
const onContextMenuFolder = (e: MouseEvent) => {
  console.log(e);
  folderContextRef.value.show(e);
};

const onContextMenuFile = (e: MouseEvent) => {
  console.log(e);
  fileContextRef.value.show(e);
};
</script>

<style scoped></style>
