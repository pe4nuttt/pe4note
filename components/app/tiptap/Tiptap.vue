<template>
  <EditorContent class="h-full" :editor="editor" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { ExtensionKit } from '~/lib/tiptap/extension-kit';

// Data
const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [...ExtensionKit],
  editorProps: {
    attributes: {
      class: 'min-h-full',
    },
  },
});
</script>

<style scoped lang="scss"></style>
