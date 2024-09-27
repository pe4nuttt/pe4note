<template>
  <div>
    <!-- Document Title -->
    <div>
      <h1
        contenteditable
        class="text-3xl font-semibold !outline-none"
        @input="onInputDocumentTitle"
      >
        {{ documentTitle }}
      </h1>
    </div>

    <div></div>
  </div>
</template>

<script setup lang="ts">
const documentTitle = ref('Document Title');

const onInputDocumentTitle = (e: Event) => {
  console.log((e.target as HTMLInputElement).value);
};
</script>

<style scoped></style>
