<template>
  <div class="bg-card text-card-foreground">
    <Tabs default-value="upload">
      <TabsList>
        <TabsTrigger value="upload">Upload</TabsTrigger>
        <TabsTrigger value="link">Link</TabsTrigger>
      </TabsList>
      <TabsContent class="mx-3 my-3" value="upload">
        <input
          class="w-0 h-0"
          type="file"
          ref="uploadBannerInputRef"
          id="uploadBannerInput"
          accept="image/*"
          @change="onUploadBanner"
        />
        <Button class="w-full" variant="outline" @click="onClickUpload"
          >Upload File</Button
        >
        <div class="text-center text-xs text-muted-foreground mt-4 mb-2">
          File must not be larger than {{ MAX_BANNER_IMAGE_SIZE }}MB
        </div>
      </TabsContent>
      <TabsContent class="mx-3 my-3" value="link">
        <Input type="text" placeholder="Paste an email link" />
        <div class="max-w-[300px] mx-auto mt-3 mb-4">
          <Button size="sm" class="w-full text-sm h-7">Submit</Button>
        </div>
        <div class="text-center text-xs text-muted-foreground mt-3 mb-2">
          Works with any image from the web
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { TabsIndicator } from 'radix-vue';
import { useToast } from '@/components/ui/toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MAX_BANNER_IMAGE_SIZE } from '~/lib/constants';

const emit = defineEmits<{
  changeBanner: [value: File];
}>();

// Composables
const { toast } = useToast();
const documentStore = useDocumentStore();
const uploadBannerInputRef = ref();
const supabaseClient = useSupabaseClient();

// METHODS
const onClickUpload = () => {
  uploadBannerInputRef.value.click();
};

const onUploadBanner = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) {
    return;
  }

  // Check file size;
  const fileSize = file.size / 1024 / 1024; // In MB
  if (fileSize > MAX_BANNER_IMAGE_SIZE) {
    uploadBannerInputRef.value.value = null;
    toast({
      title: 'Warning',
      description: `File size must not larger than ${MAX_BANNER_IMAGE_SIZE}MB`,
      variant: 'warning',
    });
    return;
  }

  try {
    emit('changeBanner', file);
    await documentStore.updateDocumentBanner(file);

    // await supabaseClient.storage.from('banners').upload('public/test', file, {
    //   upsert: false,
    //   cacheControl: '3600',
    // });
  } catch (error) {
    toast({
      title: 'Error',
      description: getErrorMessage(error),
      variant: 'destructive',
    });
  }
};
</script>

<style scoped></style>
