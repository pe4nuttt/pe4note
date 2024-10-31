<template>
  <div class="flex items-center h-full overflow-hidden">
    <ScrollArea class="w-60 pl-2 pr-3 py-4 border-r-[1px] h-full text-sm">
      <div v-for="tabList in tabLists" class="mb-4">
        <div
          class="text-muted-foreground px-[10px] mb-1 text-[10px] font-medium uppercase"
        >
          {{ tabList.label }}
        </div>
        <div v-for="tab in tabList.tabs">
          <div
            :key="`${tabList.key}-${tab.key}`"
            class="flex items-center px-[10px] py-[6px] hover:!bg-accent rounded-md dark:text-secondary-foreground dark:hover:text-white cursor-pointer transition-colors"
          >
            {{ tab.label }}
          </div>
        </div>
      </div>
    </ScrollArea>

    <div class="flex-1 h-60"></div>
  </div>
</template>

<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area';

const tabLists = [
  {
    key: 'general',
    label: 'General',
    tabs: [
      {
        key: '1',
        label: 'My account',
      },
      {
        key: '2',
        label: 'My settings',
      },
      {
        key: '3',
        label: 'My notifications',
      },
      {
        key: '4',
        label: 'My connections',
      },
      {
        key: '5',
        label: 'Language & region',
      },
    ],
  },
  {
    key: 'workspace',
    label: 'Workspace',
    tabs: [
      {
        key: '1',
        label: 'Overview',
      },
      {
        key: '2',
        label: 'Teamspaces',
      },
      {
        key: '3',
        label: 'People',
      },
      {
        key: '4',
        label: 'Security & data',
      },
      {
        key: '5',
        label: 'Connections',
      },
      {
        key: '6',
        label: 'Billing',
      },
    ],
  },
];
</script>

<style scoped></style>
