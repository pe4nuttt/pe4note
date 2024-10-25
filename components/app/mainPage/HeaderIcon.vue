<template>
  <div>
    <EmojiPicker ref="emojiPickerRef" v-model="emojiInput">
      <!-- :value="componentField.modelValue"
                @change="componentField.onChange"
                @input="componentField.onInput" -->
      <template v-slot="slotProps">
        <span class="text-5xl">{{ slotProps.value }}</span>
      </template>
    </EmojiPicker>
  </div>
</template>

<script setup lang="ts">
import EmojiPicker from '@/components/global/EmojiPicker/index.vue';

const emojiPickerRef = ref(null);
const emojiInput = ref('😀');
</script>

<style scoped></style>
