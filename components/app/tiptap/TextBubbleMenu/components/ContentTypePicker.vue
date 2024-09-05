<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <ToolbarButton
        :active="activeItem?.id != 'paragraph' && activeItem?.type == 'option'"
      >
        <!-- <Icon
          :name="
            activeItem?.type === 'option' ? activeItem.icon : 'lucide:pilcrow'
          "
        /> -->
        <span class="mr-1">
          {{ activeItem?.type === 'option' ? activeItem.label : 'Paragraph' }}
        </span>
        <Icon name="lucide:chevron-down" />
      </ToolbarButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-48">
      <DropdownMenuGroup>
        <template v-for="option in options" :key="option.id">
          <DropdownMenuLabel
            class="uppercase text-[10px] [&:not(:first-child)]:mt-2"
            v-if="option.type === 'category'"
          >
            {{ option.label }}
          </DropdownMenuLabel>
          <DropdownMenuItem v-else @click="option.onClick">
            <Icon class="mr-2" size="18px" :name="option.icon" />
            <span>{{ option.label }}</span>
          </DropdownMenuItem>
        </template>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import type { ModuleOptions } from 'nuxt-icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ToolbarButton } from '~/components/ui/toolbar';

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
