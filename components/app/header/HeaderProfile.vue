<template>
  <Dialog>
    <DialogTrigger as-child>
      <div
        class="p-[3px] rounded-full hover:bg-card hover:brightness-125 flex justify-center items-center"
      >
        <Avatar class="w-6 h-6">
          <AvatarImage
            v-if="userAvatarUrl"
            :src="userAvatarUrl"
            alt="@radix-vue"
          />
          <AvatarFallback class="uppercase">
            {{ user?.full_name?.charAt(0) }}
          </AvatarFallback>
        </Avatar>
      </div>
    </DialogTrigger>
    <DialogContent
      hide-close-button
      class="p-0 max-h-[400px] h-[400px] w-[1000px] !max-w-[calc(100vw-100px)] overflow-hidden"
    >
      <SettingDialogContent />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SettingDialogContent from './SettingDialogContent.vue';
import type { User } from '~/lib/services/service.type';

const supabase = useSupabaseClient();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const userAvatarUrl = computed(() => {
  if ((user.value as User)?.avatar_url) {
    const res = supabase.storage
      .from('avatars')
      .getPublicUrl((user.value as User).avatar_url as string);
    return res.data.publicUrl;
  }
  return null;
});
</script>

<style scoped></style>
