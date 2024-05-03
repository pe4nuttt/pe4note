<template>
  <div :id="`picker-${pickerId}`"></div>
</template>

<script setup lang="ts">
import data from '@emoji-mart/data';
import { Picker } from 'emoji-mart';
import { v4 as uuidv4 } from 'uuid';
import { onMounted, ref } from 'vue';

const pickerId = ref(uuidv4());

onMounted(() => {
  new Picker({
    parent: document.querySelector(`#picker-${pickerId.value}`),
    data,
    categories: [
      'frequent',
      'people',
      'nature',
      'activity',
      'flags',
      'foods',
      'objects',
      'places',
      'symbols',
    ],
    onEmojiSelect: (data: any) => {
      console.log('SELECT::', data);
    },
    onClickOutside: () => {
      // console.log('SELECT::', data);
    },
    onAddCustomEmoji: (data: any) => {
      console.log('ADD::', data);
    },
  });
});
</script>

<style scoped></style>
