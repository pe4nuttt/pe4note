import { z } from 'zod';
import type { Document, Collection, Workspace } from './services/service.type';

export const SignUpFormSchema = z.object({
  email: z.string().nonempty('Field is requried').email().min(2).max(50),
  password: z.string().nonempty('Field is required').min(2).max(20),
});

export const LoginFormSchema = z.object({
  email: z.string().nonempty('Field is requried').email().min(2).max(50),
  password: z.string().nonempty('Field is required').min(2).max(20),
});

export const CreateWorkspaceSchema = z.object({
  workspaceName: z
    .string()
    .describe('Workspace Name')
    .min(1, 'Workspace name must be min of 1 character'),
  // title: z
  //   .string()
  //   .describe('Workspace Name')
  //   .min(1, 'Workspace name must be min of 1 character'),
  iconId: z.string().describe('Workspace must have icon'),
  logo: z.any().nullish(),
  data: z.string().nullish(),
  inTrash: z.string().nullish(),
  bannerUrl: z.string().nullish(),
});

export type AppDocumentType = Document & {
  documents?: AppDocumentType[] | [];
  collections?: AppCollectionType[] | [];
};

export type AppCollectionType = Collection & {
  documents?: AppDocumentType[] | [];
};

export type AppWorkspaceType = {
  id?: string | null;
  data?: Workspace | null;
  // collections: AppCollectionType[] | [];
  // documents: AppDocumentType[] | [];
  records: AppWorkspaceRecord[] | [];
};

export type AppWorkspaceRecord = (Collection | Document) & {
  children: AppWorkspaceRecord[];
  type: 'document' | 'collection';
};

export enum AppMainPageType {
  collection = 'collection',
  document = 'document',
}
