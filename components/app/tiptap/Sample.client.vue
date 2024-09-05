<template>
  <div>
    <EditorContent class="h-full" :editor="tiptapEditor" />
    <template v-if="tiptapEditor">
      <TextBubbleMenu :editor="tiptapEditor" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent, Editor } from '@tiptap/vue-3';
import type { Editor as TypeEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { ExtensionKit } from '~/lib/tiptap/extension-kit';
import TextBubbleMenu from './TextBubbleMenu/TextBubbleMenu.vue';
import type { ShallowRef } from 'vue';

// Data
const editor = useEditor({
  content: `
    <p>I’m running Tiptap with Vue.js. 🎉</p>
    <div data-type="pageNode"></div>
  `,
  extensions: [...ExtensionKit],
  editorProps: {
    attributes: {
      class: 'min-h-full',
    },
  },
});

// console.log('[TEST]', editor);

// const editor = useTiptapEditor({
//   ydoc,
//   provider,
// });
const wsConnection = new WebSocket('ws://127.0.0.1:3000/sync');
const ydoc = new Y.Doc();
const provider = new HocuspocusProvider({
  name: 'document.name',
  url: wsConnection.url,
  document: ydoc,
});

// const provider = ref<HocuspocusProvider>();
// const tiptapEditor = ref<ShallowRef<Editor | undefined>>();
let tiptapEditor = shallowRef<Editor | undefined>();

// Computed
// const editor = computed(() => {
//   if (provider?.value) {
//     const { editor: tmpEditor } = useTiptapEditor({
//       ydoc: ydoc,
//       provider: provider.value,
//     });

//     console.log('[COMPUTED] editor', tmpEditor);

//     return tmpEditor;
//   }
//   return null;
// });

// watch(
//   () => [provider, ydoc],
//   () => {
//     if (provider.value) {
//       // const { editor } = useTiptapEditor({
//       //   ydoc: ydoc.value,
//       //   provider: provider.value as HocuspocusProvider,
//       // });
//     }
//     const editor = useEditor({
//       content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
//       extensions: [...ExtensionKit],
//       editorProps: {
//         attributes: {
//           class: 'min-h-full',
//         },
//       },
//     });

//     // tiptapEditor.value = editor;
//     console.log('[WATCH] Editor', editor);
//   },
//   {
//     immediate: true,
//     deep: true,
//   },
// );

// Methods
// const initHocuspocusProvider = async () => {
//   try {
//     const wsConnection = new WebSocket('ws://127.0.0.1:3000/sync');
//     provider.value = new HocuspocusProvider({
//       name: 'document.name',
//       url: wsConnection.url,
//       document: ydoc.value,
//     });
//   } catch (error) {
//     console.log('[ERR] init provider', error);
//   }

//   console.log('[INIT]', provider.value);
// };

// onBeforeMount(() => {
//   console.log(123456);
//   initHocuspocusProvider();
// });

onMounted(async () => {
  await nextTick();
  const { editor } = useTiptapEditor({
    ydoc: ydoc,
    provider: provider,
  });
  tiptapEditor.value = editor;

  console.log('[MOUNTED]', editor);

  // initHocuspocusProvider();
});
</script>

<style scoped lang="scss"></style>
