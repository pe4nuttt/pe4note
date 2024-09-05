<template>
  <div>
    <Toolbar class="fixed top-4 left-60 z-10">
      <ToolbarButton class="">Test123</ToolbarButton>
      <ToolbarButton class="">Test123</ToolbarButton>

      <ToolbarToggleGroup
        v-model="toggleStateMultiple"
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
        v-model="toggleStateMultiple"
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
    </Toolbar>
  </div>
</template>

<script setup lang="ts">
import Toolbar from './Toolbar.vue';
import ToolbarButton from './ToolbarButton.vue';
import ToolbarToggleGroup from './ToolbarToggleGroup.vue';
import ToolbarToggleItem from './ToolbarToggleItem.vue';
import ToolbarSeperator from './ToolbarSeperator.vue';

const toggleStateSingle = ref('center');
const toggleStateMultiple = ref([]);
</script>

<style scoped></style>
