import { defineStore } from 'pinia';
import { AppMainPageType } from '~/lib/types';

export const useMainPageStore = defineStore('mainPage', () => {
  const route = useRoute();

  const bannerUpload = ref({
    isUploading: false,
    progress: 0,
  });

  const documentStore = useDocumentStore();
  const collectionStore = useCollectionStore();
  const { document } = storeToRefs(documentStore);
  const { collection } = storeToRefs(collectionStore);

  const pageBannerUrl = ref<string | null>();
  const pageType = computed<AppMainPageType | null>(() => {
    const path = route.path;

    if (path.startsWith('/document')) return AppMainPageType.document;

    if (path.startsWith('/collection')) return AppMainPageType.collection;

    return null;
  });

  return {
    pageType,
    bannerUpload,
    pageBannerUrl,
  };
});
