<template>
  <div></div>
</template>

<script setup lang="ts">
import type { ModuleOptions } from 'nuxt-icon';

export type ContentTypePickerOption = {
  label: string;
  id: string;
  type: 'option';
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  icon: string; // Update later => must be type of icon
};

export type ContentTypePicketCategory = {
  label: string;
  id: string;
  type: 'category';
};

export type ContentTypePickerOptions = Array<
  ContentTypePickerOption | ContentTypePicketCategory
>;

export type ContentTypePickerProps = {
  options: ContentTypePickerOptions;
};

// Props
const props = defineProps<ContentTypePickerProps>();
const { options } = toRefs(props);

// Composables
const activeItem = computed(() => {
  return options.value.find(
    option => option.type === 'option' && option.isActive(),
  );
});

const isOption = (
  option: ContentTypePickerOption | ContentTypePicketCategory,
) => option.type === 'option';

const isCategory = (
  option: ContentTypePickerOption | ContentTypePicketCategory,
) => option.type === 'category';
</script>

<style scoped></style>
