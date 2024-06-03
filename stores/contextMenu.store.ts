import { defineStore } from 'pinia';
import type { File, Folder } from '~/lib/services/service.type';

export const useContextMenuStore = defineStore('contextMenuStore', () => {
  const folderContextMenu = ref<{
    folder: Folder | null;
    event: MouseEvent | null;
    wrapperId?: string | null;
  }>();

  const onFolderContextMenu = (
    event: MouseEvent,
    folder: Folder,
    wrapperId?: string,
  ) => {
    folderContextMenu.value = {
      folder,
      event,
      wrapperId: wrapperId,
    };
  };

  const fileContextMenu = ref<{
    file: File | null;
    event: MouseEvent | null;
  }>();

  const onFileContextMenu = (event: MouseEvent, file: File) => {
    fileContextMenu.value = {
      file,
      event,
    };
  };

  return {
    folderContextMenu,
    fileContextMenu,
    onFolderContextMenu,
    onFileContextMenu,
  };
});
