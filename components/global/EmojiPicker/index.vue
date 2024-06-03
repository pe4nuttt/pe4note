<template>
  <Popover>
    <PopoverTrigger class="cursor-pointer">
      <slot :value="emojiOutput"></slot>
    </PopoverTrigger>
    <PopoverContent class="p-0">
      <Picker
        ref="emojiPickerRef"
        class="emoji-picker-wrapper"
        :data="emojiIndex"
        @select="onSelectEmoji"
        :size="50"
        emoji="department_store"
      />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src';
import data from 'emoji-mart-vue-fast/data/all.json';
import 'emoji-mart-vue-fast/css/emoji-mart.css';
let emojiIndexData = new EmojiIndex(data);
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Props
interface Props {
  modelValue?: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '💼',
});

// Emits
const emits = defineEmits<{
  'update:modelValue': [modelValue: string];
}>();

// Data
const emojiPickerRef = ref(null);
const pickerId = ref(uuidv4());
const emojiIndex = ref(emojiIndexData);

const emojiOutput = ref(props.modelValue);

onMounted(() => {
  // nextTick(() => {
  //   new Picker({
  //     parent: document.querySelector(`#picker-${pickerId.value}`),
  //     data,
  //     categories: [
  //       'frequent',
  //       'people',
  //       'nature',
  //       'activity',
  //       'flags',
  //       'foods',
  //       'objects',
  //       'places',
  //       'symbols',
  //     ],
  //     onEmojiSelect: (data: any) => {
  //       console.log('SELECT::', data);
  //     },
  //     onClickOutside: () => {
  //       // console.log('SELECT::', data);
  //     },
  //     onAddCustomEmoji: (data: any) => {
  //       console.log('ADD::', data);
  //     },
  //   });
  // });
});

// METHODS
function onSelectEmoji(emoji: any) {
  console.log(emoji);
  emits('update:modelValue', emoji.native);
  emojiOutput.value = emoji.native;
}

defineExpose({
  emojiPickerRef,
});
</script>

<style scoped></style>
