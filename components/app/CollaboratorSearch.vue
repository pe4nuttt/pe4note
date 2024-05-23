<template>
  <div>
    <Sheet>
      <SheetTrigger>
        <slot></slot>
      </SheetTrigger>
      <SheetContent class="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Search Collaborator</SheetTitle>
          <SheetDescription>
            <p class="text-sm text-muted-foreground">
              You can also remove collaborators after adding them from the
              settings tab.
            </p>
          </SheetDescription>
        </SheetHeader>

        <!-- Search Input -->
        <div class="relative w-full max-w-sm items-center mt-4">
          <Input
            id="search"
            type="text"
            placeholder="Search..."
            class="pl-10"
            v-model="searchInput"
          />
          <!-- @change="fnChangeSearchInput" -->
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <Icon
              name="lucide:search"
              color="text-muted-foreground"
              size="20px"
            ></Icon>
          </span>
        </div>

        <!-- User list -->
        <ScrollArea class="mt-4 w-full rounded-md">
          <div
            v-for="user in userSearchFiltered"
            :key="user.id"
            class="p-4 flex justify-between items-center"
          >
            <Avatar>
              <AvatarImage
                :src="fnGetUserAvatar(user.avatar_url as string)"
                alt="Avatar"
              />
              <AvatarFallback>{{
                user.email?.slice(0, 2).toUpperCase()
              }}</AvatarFallback>
            </Avatar>

            <div
              class="text-sm text-muted-foreground overflow-ellipsis overflow-hidden w-[180px]"
            >
              {{ user.email }}
            </div>
            <Button variant="secondary" @click="addCollaborator(user)">
              Add
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/lib/services/service.type';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { useDebounceFn } from '@vueuse/core';
// import { getUsersFromSearch } from '~/lib/datastore';

interface Props {
  existingCollaborators: User[] | [];
}

const props = defineProps<Props>();
const emits = defineEmits<{
  addCollaborator: [user: User];
}>();

const { $dataStore } = useNuxtApp();
const supabase = useSupabaseClient();

// Data
const { user } = useUserStore();
const userSearchResults = ref<User[]>([]);
const searchInput = ref('');

// Hooks
const userSearchFiltered = computed(() => {
  return userSearchResults.value
    .filter(
      item =>
        !props.existingCollaborators.some(existing => existing.id === item.id),
    )
    .filter(item => item.id !== user?.id);
});

watch(
  searchInput,
  useDebounceFn(async value => {
    console.log('DEBOUNCE', value);

    try {
      const res = await $dataStore.getUsersFromSearch(value);
      console.log('[RES]', res);
      userSearchResults.value = res;
    } catch (error) {
      console.log('[ERROR]', error);
    }
  }, 500),
);

// Methods
const fnChangeSearchInput = useDebounceFn(async event => {
  console.log('DEBOUNCE', event.target.value);

  try {
    const res = await $dataStore.getUsersFromSearch(event.target.value);
    console.log('[RES]', res);
    userSearchResults.value = res;
  } catch (error) {
    console.log('[ERROR]', error);
  }
}, 500);

const fnGetUserAvatar = (path: string) => {
  const res = supabase.storage.from('avatars').getPublicUrl(path);
  console.log('[Avatar]', res.data.publicUrl);
  return res.data.publicUrl;
};

const addCollaborator = (user: User) => {
  console.log(user);
  emits('addCollaborator', user);
};
</script>

<style scoped></style>
