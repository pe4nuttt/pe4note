import prisma_client from '~/prisma/prisma.client';
import type { Folder, File } from './service.type';

type FolderData = Folder & {
  files?: File[];
  folders?: Folder[];
};

export namespace FolderService {
  export async function getNestedFolders(
    workspaceId: string,
    parentFolderId: string,
  ): Promise<FolderData[]> {
    const folders: FolderData[] = await prisma_client.folders.findMany({
      where: {
        parentFolderId,
        workspaceId,
      },
      include: {
        files: true,
      },
    });

    folders.forEach(async (folder, index) => {
      const subFolders = await getNestedFolders(workspaceId, folder.id);
      folders[index].folders = subFolders;
    });

    return folders;
  }
}
