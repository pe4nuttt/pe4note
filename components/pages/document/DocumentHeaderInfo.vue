<template>
  <div>
    <!-- Document Title -->
    <div>
      <h1
        ref="documentTitleRef"
        contenteditable
        class="text-4xl font-semibold !outline-none"
        @input="onInputDocumentTitle"
        @keydown="onKeyDownDocumentTitle"
        data-placeholder="Untitled"
      >
        {{ documentTitle }}
      </h1>
    </div>

    <div></div>
  </div>
</template>

<script setup lang="ts">
import _, { debounce } from 'lodash';

import { useToast } from '@/components/ui/toast';
const { toast } = useToast();

const documentStore = useDocumentStore();
const { document } = storeToRefs(documentStore);
const { updateCurrentDocument } = documentStore;

const documentTitleRef = ref();

const documentTitle = computed({
  get() {
    return document.value?.title;
  },
  set(newValue = '') {
    if (document.value?.title) document.value.title = newValue;
  },
});

// watch(
//   () => document.value?.title,
//   debounce(async val => {
//     console.debug('[DOCUMENT TITLE] UPDATE:: ', val);
//     try {
//       await updateCurrentDocument({
//         title: val || '',
//       });
//     } catch (error: any) {
//       console.debug(error?.response);
//       toast({
//         title: 'Error',
//         description: getErrorMessage(error),
//         variant: 'destructive',
//       });
//     }
//   }, 1000),
// );

const onInputDocumentTitle = debounce(async (e: Event) => {
  const val = (e.target as HTMLHeadingElement).textContent;
  // if (!_.isNil(document.value?.title)) document.value.title = val;
  try {
    await updateCurrentDocument({
      title: val || '',
    });
  } catch (error: any) {
    console.debug(error?.response);
    toast({
      title: 'Error',
      description: getErrorMessage(error),
      variant: 'destructive',
    });
  }
}, 1000);

const moveTitleCursorToLeft = () => {
  const el = documentTitleRef.value;
  const range = window.document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  sel?.removeAllRanges();
  sel?.addRange(range);
};

const onKeyDownDocumentTitle = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};
</script>

<style scoped lang="scss">
[data-placeholder]:empty:before {
  content: attr(data-placeholder);
  opacity: 0.5;
}
</style>
