vbase
<template>
  <Card class="w-[800px] h-screen sm:h-auto">
    <CardHeader>
      <CardTitle>Create A Workspace</CardTitle>
      <CardDescription
        >Let's create a private workspace to get you started. You can add
        collaborators later from the workspace setting tab.</CardDescription
      >
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <div class="flex flex-col gap-4">
          <div class="flex gap-4 items-center">
            <div>
              <EmojiPicker>
                <template v-slot="slotProps">
                  <span class="text-5xl">{{ slotProps.value }}</span>
                </template>
              </EmojiPicker>
            </div>

            <FormField v-slot="{ componentField }" name="workspaceName">
              <FormItem v-auto-animate class="flex-1">
                <FormLabel class="text-muted-foreground text-sm"
                  >Name</FormLabel
                >
                <FormControl>
                  <Input
                    class="bg-transparent"
                    type="text"
                    placeholder="Workspace Name"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <FormField v-slot="{ componentField }" name="logo">
            <FormItem v-auto-animate>
              <FormLabel class="text-muted-foreground text-sm"
                >Worksapce Logo</FormLabel
              >
              <FormControl>
                <Input
                  class="bg-transparent"
                  type="file"
                  accept="image/*"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <div class="text-end mt-6">
          <Button type="submit" :disabled="isSubmitting">
            <Loader v-if="isSubmitting" />
            <span v-else>Create Workspace</span>
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Loader from '@/components/global/Loader.vue';
import EmojiPicker from '@/components/global/EmojiPicker/index.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { CreateWorkspaceSchema } from '~/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/toast/use-toast';
// import { createWorkspace } from '@/lib/supabase/queries.ts';
import type { Workspace } from '~/lib/services/service.type';

const createWorkspaceFormSchema = toTypedSchema(CreateWorkspaceSchema);

// Data
const { toast } = useToast();
// const authStore = useAuthStore();

const { isSubmitting, handleSubmit } = useForm({
  validationSchema: createWorkspaceFormSchema,
  initialValues: {
    workspaceName: '',
    logo: null,
  },
});

// Methods
const onSubmit = handleSubmit(async values => {
  console.log(values);

  // const file = values.logo;
  // let filePath = null;
  // const workspaceId = uuidv4();

  // console.log('File:: ', file);
  // if (file) {
  //   // 1. Upload file to storage
  //   try {
  //     const { data, error } = await supabase.storage
  //       .from('workspace-logos')
  //       .upload(`workspaceLogo.${workspaceId}`, file, {
  //         cacheControl: '3600',
  //         upsert: true,
  //       });

  //     if (error) throw new Error('');
  //     filePath = data.path;
  //     console.log(filePath);
  //   } catch (error) {
  //     console.log('Error', error);
  //     toast({
  //       variant: 'destructive',
  //       title: 'Error! Could not upload your workspace logo',
  //     });
  //   }

  //   // 2. Create workspace
  //   try {
  //     const newWorkspace: Workspace = {
  //       data: null,
  //       created_at: new Date().toISOString(),
  //       icon_id: '',
  //       id: workspaceId,
  //       in_trash: '',
  //       title: values.workspaceName,
  //       workspace_owner: authStore?.session?.user?.id || '',
  //       banner_url: '',
  //       logo: filePath || null,
  //     };

  //     createWorkspace(newWorkspace);
  //   } catch (error) {}
  // }
});
</script>
