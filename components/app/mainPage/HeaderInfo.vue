<template>
  <div>
    <!-- Document Title -->
    <div>
      <h1
        ref="titleRef"
        contenteditable
        class="text-4xl font-semibold !outline-none"
        @input="onInputEntityTitle"
        @keydown="onKeyDownEntityTitle"
        data-placeholder="Untitled"
      >
        {{ entityTitle }}
      </h1>
    </div>

    <div></div>
  </div>
</template>

<script setup lang="ts">
import _, { debounce } from 'lodash';

import { useToast } from '@/components/ui/toast';
import { AppMainPageType } from '~/lib/types';
const { toast } = useToast();

const documentStore = useDocumentStore();
const collectionStore = useCollectionStore();
const mainPageStore = useMainPageStore();

const { document } = storeToRefs(documentStore);
const { collection } = storeToRefs(collectionStore);
const { pageType } = storeToRefs(mainPageStore);
const { updateCurrentDocument } = documentStore;
const { updateCurrentCollection } = collectionStore;

const titleRef = ref();

const entityTitle = computed({
  get() {
    return pageType.value === AppMainPageType.document
      ? document.value?.title
      : collection.value?.title;
  },
  set(newValue = '') {
    if (pageType.value === AppMainPageType.document && document.value?.title) {
      document.value.title = newValue;
    } else if (
      pageType.value === AppMainPageType.collection &&
      collection.value?.title
    ) {
      collection.value.title = newValue;
    }
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

const onInputEntityTitle = debounce(async (e: Event) => {
  const val = (e.target as HTMLHeadingElement).textContent;
  // if (!_.isNil(document.value?.title)) document.value.title = val;
  try {
    const newTitle = val || '';
    await handleUpdateTitle(newTitle);
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
  const el = titleRef.value;
  const range = window.document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  sel?.removeAllRanges();
  sel?.addRange(range);
};

const onKeyDownEntityTitle = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};

const handleUpdateTitle = async (title: string) => {
  if (pageType.value === AppMainPageType.document) {
    await updateCurrentDocument({
      title,
    });
  } else if (pageType.value === AppMainPageType.collection) {
    await updateCurrentCollection({
      title,
    });
  }
};
</script>

<style scoped lang="scss">
[data-placeholder]:empty:before {
  content: attr(data-placeholder);
  opacity: 0.5;
}
</style>
