<template>
  <div class="flex gap-4 flex-col w-full mt-3">
    <div>
      <Label htmlFor="name" class="text-muted-foreground">Name</Label>
      <Input class="mt-2" id="name" v-model="workspaceTitle"> </Input>
    </div>
    <div>
      <Label htmlFor="permission" class="text-muted-foreground"
        >Permission</Label
      >
      <Select v-model="workspacePermission">
        <SelectTrigger class="mt-2 h-26 text-wrap">
          <SelectValue class="flex" placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="private">
              <div class="flex justify-center items-center gap-4">
                <Icon
                  name="lucide:lock"
                  color="text-muted-foreground"
                  size="20px"
                ></Icon>
                <article class="text-left">
                  <span>Private</span>
                  <p>
                    Your workspace is private to you. You can choose to share it
                    later.
                  </p>
                </article>
              </div>
            </SelectItem>
            <SelectItem value="shared">
              <div class="flex justify-center items-center gap-4">
                <Icon
                  name="lucide:share"
                  color="text-muted-foreground"
                  size="20px"
                ></Icon>
                <article class="text-left">
                  <span>Shared</span>
                  <p>You can invite collaborators.</p>
                </article>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <template v-if="workspacePermission === 'shared'">
      <div>
        <keep-alive>
          <CollaboratorSearch
            :existingCollaborators="collaborators"
            @add-collaborator="fnAddCollaborator"
          >
            <Button>
              <Icon
                name="lucide:plus"
                color="text-muted-foreground"
                size="20px"
              />
              Add Collaborators
            </Button>
          </CollaboratorSearch>
        </keep-alive>
      </div>
      <Label class="text-muted-foreground mt-2">Collaborators</Label>
      <ScrollArea
        v-if="collaborators?.length"
        class="rounded-md border border-muted-foreground/20 flex-1"
      >
        <div
          v-for="user in collaborators"
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
          <Button variant="secondary" @click="fnRemoveCollaborator(user)">
            Remove
          </Button>
        </div>
      </ScrollArea>
    </template>

    <Button
      :disabled="
        !workspaceTitle ||
        (workspacePermission === 'shared' && collaborators.length === 0) ||
        isLoading
      "
      type="button"
      variant="secondary"
      @click="handleCreateWorkspace"
      >Create</Button
    >
  </div>
</template>

<script setup lang="ts">
import { Label } from '../ui/label';
import Input from '../ui/input/Input.vue';
import Button from '@/components/ui/button/Button.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CollaboratorSearch from './CollaboratorSearch.vue';
import type { User, Workspace } from '~/lib/services/service.type';
import { v4 } from 'uuid';
import { useToast } from '@/components/ui/toast';

const emits = defineEmits<{
  close: [];
}>();

const { toast } = useToast();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const workspaceTitle = ref('');
const workspacePermission = ref<'private' | 'shared'>('private');
const collaborators = ref<User[]>([]);
const isLoading = ref(false);

const fnGetUserAvatar = (path: string) => {
  const res = supabase.storage.from('avatars').getPublicUrl(path);
  console.log('[Avatar]', res.data.publicUrl);
  return res.data.publicUrl;
};

const fnAddCollaborator = (user: User) => {
  collaborators.value.push(user);
};

const fnRemoveCollaborator = (user: User) => {
  const foundIdx = collaborators.value.findIndex(
    collaborator => collaborator.id === user.id,
  );
  collaborators.value.splice(foundIdx, 1);
};

const handleCreateWorkspace = async () => {
  isLoading.value = true;
  try {
    if (user.value?.id) {
      const uuid = v4();
      const newWorkspace: Workspace = {
        data: null,
        created_at: new Date(),
        iconId: '💼',
        id: uuid,
        inTrash: '',
        title: workspaceTitle.value,
        workspaceOwner: user.value.id,
        bannerUrl: '',
        logo: null,
      };

      await createWorkspaceApi(newWorkspace);

      if (workspacePermission.value === 'shared') {
        await addCollaboratorsApi(
          uuid,
          collaborators.value.map(item => item.id),
        );
      }
      toast({
        title: 'Success',
        description: 'Created workspace',
        variant: 'success',
      });
      await refreshNuxtData();
      emits('close');
    }
  } catch (error) {
    console.log('[ERROR]:: ', error);
    toast({
      title: 'Error',
      description:
        error instanceof Error ? error.message : 'Something went wrong',
      variant: 'destructive',
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
