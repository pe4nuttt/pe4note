<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="{items[0].href}">
          {{ firstLabel }}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <template v-if="items.length > itemsToDisplay">
        <BreadcrumbItem>
          <DropdownMenu v-if="isDesktop" v-model:open="isOpen">
            <DropdownMenuTrigger
              class="flex items-center gap-1"
              aria-label="Toggle menu"
            >
              <BreadcrumbEllipsis class="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                v-for="item of allButLastTwoItems"
                :key="item.label"
              >
                <a :href="item.href || '#'">
                  {{ item.label }}
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </template>
      <BreadcrumbItem v-for="item of remainingItems" :key="item.label">
        <template v-if="item.href">
          <BreadcrumbLink as-child class="max-w-20 truncate md:max-w-none">
            <a :href="item.href">
              {{ item.label }}
            </a>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </template>
        <BreadcrumbPage v-else class="max-w-20 truncate md:max-w-none">
          {{ item.label }}
        </BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';
import { computed, ref } from 'vue';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const isDesktop = useMediaQuery('(min-width: 768px)');
const isOpen = ref(false);
const items = ref([
  { href: '#', label: 'Home' },
  { href: '#', label: 'Documentation' },
  { href: '#', label: 'Building Your Application' },
  { href: '#', label: 'Data Fetching' },
  { label: 'Caching and Revalidating' },
]);

const itemsToDisplay = 3;
const firstLabel = computed(() => items.value[0]?.label);

const allButLastTwoItems = computed(() => items.value.slice(1, -2));
const remainingItems = computed(() => items.value.slice(-itemsToDisplay + 1));
</script>
