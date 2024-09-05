<template>
  <BubbleMenu
    :editor="props.editor"
    :tippy-options="{ popperOptions: { placement: 'top-start' } }"
    :update-delay="100"
    pluginKey="textBubbleMenu"
    :should-show="states.shouldShow"
  >
    <Toolbar class="z-10 last:pr-2">
      <ContentTypePicker :options="blockOptions" />
      <ToolbarButton
        :active="states.isBold"
        v-tooltip="{
          content: '<p>Bold</p><p class=\'text-gray-400\'>Ctrl + B</p>',
          html: true,
        }"
        @click="commands.onBold"
      >
        <Icon name="lucide:bold" size="15px" class="w-[15px] h-[15px]"></Icon>
      </ToolbarButton>
      <ToolbarButton
        :active="states.isItalic"
        v-tooltip="{
          content: `<p>Italic</p><p class=\'text-gray-400\'>Ctrl + I</p>`,
          html: true,
        }"
        @click="commands.onItalic"
      >
        <Icon name="lucide:italic" size="15px" class="w-[15px] h-[15px]"></Icon>
      </ToolbarButton>
      <ToolbarButton
        :active="states.isUnderline"
        v-tooltip="{
          content: '<p>Underline</p><p class=\'text-gray-400\'>Ctrl + U</p>',
          html: true,
        }"
        @click="commands.onUnderline"
      >
        <Icon
          name="lucide:underline"
          size="15px"
          class="w-[15px] h-[15px]"
        ></Icon>
      </ToolbarButton>
      <ToolbarButton
        :active="states.isStrike"
        v-tooltip="{
          content:
            '<p>Strike-through</p><p class=\'text-gray-400\'>Ctrl + Shift + S</p>',
          html: true,
        }"
        @click="commands.onStrike"
      >
        <Icon
          name="lucide:strikethrough"
          size="15px"
          class="w-[15px] h-[15px]"
        ></Icon>
      </ToolbarButton>
      <ToolbarButton
        :active="states.isCode"
        v-tooltip="{
          content: '<p>Code</p><p class=\'text-gray-400\'>Ctrl + E</p>',
          html: true,
        }"
        @click="commands.onCode"
      >
        <Icon name="lucide:code" size="15px" class="w-[15px] h-[15px]"></Icon>
      </ToolbarButton>
      <ToolbarButton
        v-tooltip="{
          content:
            '<p>Code block</p><p class=\'text-gray-400\'>Ctrl + Alt + C</p>',
          html: true,
        }"
        @click="commands.onCodeBlock"
      >
        <Icon
          name="lucide:code-xml"
          size="15px"
          class="w-[15px] h-[15px]"
        ></Icon>
      </ToolbarButton>
      <MenuColorPicker
        :color="states.currentColor"
        :highlight-color="states.currentHighlight"
        @changeColor="color => commands.onChangeColor(color)"
        @clearColor="commands.onClearColor"
        @changeHighlightColor="color => commands.onChangeHighlight(color)"
        @clearHighlightColor="commands.onClearHighlight"
      />
      <!-- <ToolbarToggleGroup
        type="multiple"
        aria-label="Text formatting"
        class="pr-[10px]"
      >
        <ToolbarToggleItem value="bold" aria-label="Bold" pressed>
          <Icon name="lucide:bold" size="15px" class="w-[15px] h-[15px]"></Icon>
        </ToolbarToggleItem>
      </ToolbarToggleGroup> -->
      <!-- <ToolbarButton class="">Test123</ToolbarButton>
      <ToolbarButton active class="">Test123</ToolbarButton>

      <ToolbarToggleGroup
        type="multiple"
        aria-label="Text formatting"
        class="pr-[10px]"
      >
        <ToolbarToggleItem value="bold" aria-label="Bold">
          <Icon name="lucide:bold" size="15px" class="w-[15px] h-[15px]"></Icon>
        </ToolbarToggleItem>
        <ToolbarToggleItem value="italic" aria-label="Italic">
          Italic
        </ToolbarToggleItem>
        <ToolbarToggleItem value="strikethrough" aria-label="Strike through">
          Strike
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeperator />
      <ToolbarToggleGroup
        type="multiple"
        aria-label="Text formatting"
        class="pr-[10px]"
      >
        <ToolbarToggleItem value="bold" aria-label="Bold">
          <Icon name="lucide:bold" size="15px" class="w-[15px] h-[15px]"></Icon>
        </ToolbarToggleItem>
        <ToolbarToggleItem value="italic" aria-label="Italic">
          Italic
        </ToolbarToggleItem>
        <ToolbarToggleItem value="strikethrough" aria-label="Strike through">
          Strike
        </ToolbarToggleItem>
      </ToolbarToggleGroup> -->
    </Toolbar>
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

import {
  Toolbar,
  ToolbarButton,
  ToolbarSeperator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from '@/components/ui/toolbar';
import ContentTypePicker from './components/ContentTypePicker.vue';
import MenuColorPicker from './components/MenuColorPicker.vue';
import { useTextBubbleMenuStates } from './composables/useTextBubbleMenuStates';

type TextBubbleMenuProps = {
  editor: Editor;
};

import { BubbleMenu, Editor } from '@tiptap/vue-3';
import { useTextBubbleMenuContentTypes } from './composables/useTextBubbleMenuContentType';
import { useTextBubbleMenuCommands } from './composables/useTextBubbleMenuCommands';

const props = defineProps<TextBubbleMenuProps>();
const blockOptions = useTextBubbleMenuContentTypes(props.editor);
const states = computed(() => useTextBubbleMenuStates(props.editor));
const commands = computed(() => useTextBubbleMenuCommands(props.editor));
</script>

<style scoped lang="scss"></style>
