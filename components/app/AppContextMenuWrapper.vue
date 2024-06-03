<template>
  <div>
    <FolderContextMenu />
    <FileContextMenu />
  </div>
</template>

<script setup lang="ts">
import FolderContextMenu from '~/components/global/ContextMenu/FolderContextMenu.vue';
import FileContextMenu from '~/components/global/ContextMenu/FileContextMenu.vue';
</script>

<style scoped></style>
