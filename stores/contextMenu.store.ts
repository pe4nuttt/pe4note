import { defineStore } from 'pinia';
import type { File, Folder } from '~/lib/services/service.type';

export const useContextMenuStore = defineStore('contextMenuStore', () => {
  const folderContextMenu = ref<{
    folder: Folder | null;
    event: MouseEvent | null;
    wrapperId?: string | null; // Folder sidebar element id
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
    wrapperId?: string | null; // File sidebar element id
  }>();

  const onFileContextMenu = (
    event: MouseEvent,
    file: File,
    wrapperId?: string,
  ) => {
    fileContextMenu.value = {
      file,
      event,
      wrapperId: wrapperId,
    };
  };

  return {
    folderContextMenu,
    fileContextMenu,
    onFolderContextMenu,
    onFileContextMenu,
  };
});
