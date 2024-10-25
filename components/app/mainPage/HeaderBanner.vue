<template>
  <div
    id="document-banner-wrapper"
    class="relative group min-h-14"
    @mouseover="toggleHeaderControlsVisible(true)"
    @mouseleave="toggleHeaderControlsVisible(false)"
  >
    <template v-if="bannerImageSrc">
      <img
        :src="bannerImageSrc"
        alt=""
        :class="[
          `block max-h-[200px] h-[200px] w-full object-center object-cover rounded-[6px]`,
          {
            'opacity-50': bannerUpload.isUploading,
          },
        ]"
      />
      <div
        :class="
          cn(
            `opacity-0 group-hover:visible group-hover:opacity-100 delay-75 duration-150 transition-opacity 
          ease-in-out flex absolute top-1 right-1 mx-4 rounded-sm bg-card overflow-hidden
          outline-1 outline outline-border shadow
          `,
            [changeCoverVisible ? 'visible opacity-100' : 'invisible'],
            {
              '!invisible': bannerUpload.isUploading,
            },
          )
        "
      >
        <Popover v-model:open="changeCoverVisible">
          <PopoverTrigger as-child>
            <div
              class="text-xs px-2 py-1 cursor-pointer hover:bg-accent hover:text-white transition-colors"
            >
              Change cover
            </div>
          </PopoverTrigger>
          <PopoverContent
            class="max-w-[500px] w-[500px] rounded-xl border shadow p-0 overflow-hidden right-1 relative"
          >
            <BannerSelection @changeBanner="onBannerChange" />
          </PopoverContent>
        </Popover>

        <div class="w-[0.5px] bg-border"></div>
        <div
          class="text-xs px-2 py-1 cursor-pointer hover:bg-accent hover:text-white transition-colors"
        >
          Reposition
        </div>
      </div>
    </template>

    <div
      v-if="bannerUpload.isUploading"
      class="absolute flex items-center justify-center gap-2 bottom-1 right-1 rounded-sm bg-black/70 p-1 text-sm"
    >
      <Loader class="w-4 h-4 dark:text-foreground" />
      {{ bannerUploadProgress }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import BannerSelection from './BannerSelection/index.vue';
import Loader from '~/components/global/Loader.vue';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { AppMainPageType } from '~/lib/types';

const documentStore = useDocumentStore();
const collectionStore = useCollectionStore();
const mainPageStore = useMainPageStore();
const supabase = useSupabaseClient();

const { document } = storeToRefs(documentStore);
const { collection } = storeToRefs(collectionStore);
const { bannerUpload, pageType, pageBannerUrl } = storeToRefs(mainPageStore);

const changeCoverVisible = ref(false);
const bannerImageSrc = ref<string | null>();

const bannerUploadProgress = computed(() => {
  return bannerUpload.value.progress
    ? Math.floor(bannerUpload.value.progress)
    : 0;
});

watch(
  () => bannerUpload.value.isUploading,
  val => {
    if (val) {
      changeCoverVisible.value = false;
    }
  },
);

watch(
  () => pageBannerUrl.value,
  val => {
    if (val) {
      console.log('[WATCH]', val);
      const res = supabase.storage.from('banners').getPublicUrl(val);
      bannerImageSrc.value = res.data.publicUrl;
    } else {
      bannerImageSrc.value = null;
    }
  },
  {
    immediate: true,
  },
);

watch(
  () => [
    pageType.value,
    collection?.value?.bannerUrl,
    document?.value?.bannerUrl,
  ],
  () => {
    console.log(
      '[COMPUTED]',
      document?.value?.bannerUrl,
      collection?.value?.bannerUrl,
      pageType.value === AppMainPageType.document,
    );

    if (pageType.value === AppMainPageType.document)
      pageBannerUrl.value = document?.value?.bannerUrl || null;
    else pageBannerUrl.value = collection?.value?.bannerUrl || null;
  },
);

// Methods
const toggleHeaderControlsVisible = (isVisible: boolean) => {
  const ele = window.document.querySelector('#entity-header-controls');
  if (ele) {
    (ele as any).style.visibility = isVisible ? 'visible' : '';
    (ele as any).style.opacity = isVisible ? 1 : '';
  }
};

const onBannerChange = (file: File) => {
  const reader = new FileReader();

  reader.onload = e => {
    bannerImageSrc.value = e.target?.result! as string;
  };

  reader.readAsDataURL(file);
};
</script>

<style scoped></style>
