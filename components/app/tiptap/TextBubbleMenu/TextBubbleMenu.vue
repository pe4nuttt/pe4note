<template>
  <BubbleMenu
    :editor="props.editor"
    :tippy-options="{ popperOptions: { placement: 'top-start' } }"
    :update-delay="100"
    pluginKey="textBubbleMenu"
    :should-menu="true"
  >
  </BubbleMenu>
</template>

<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';

type TextBubbleMenuProps = {
  editor: Editor;
};

import { BubbleMenu, Editor } from '@tiptap/vue-3';
import { useTextBubbleMenuContentTypes } from './composables/useTextBubbleMenuContentType';

const props = defineProps<TextBubbleMenuProps>();
const blockOptions = useTextBubbleMenuContentTypes(props.editor);
</script>

<style scoped></style>
