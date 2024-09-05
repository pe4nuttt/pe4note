import type { HocuspocusProvider } from '@hocuspocus/provider';
import { Editor, useEditor } from '@tiptap/vue-3';
import type { Doc, Doc as YDoc } from 'yjs';
import { ExtensionKit } from '~/lib/tiptap/extension-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';

interface IUseTipTapEditorParams {
  ydoc: Doc;
  provider: HocuspocusProvider | null;
}

const initalContent = `
<p>I’m running Tiptap with Vue.js. 🎉</p>
<div data-type="pageNode">
  <p>Test</p>
</div>
<pageNode href="/dashboard">Test123</pageNode>
`;

export const useTiptapEditor = ({ ydoc, provider }: IUseTipTapEditorParams) => {
  // const editor = useEditor({
  //   content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  //   extensions: [
  //     ...ExtensionKit,
  //     Collaboration.configure({
  //       document: ydoc,
  //     }),
  //     CollaborationCursor.configure({
  //       provider: provider,
  //     }),
  //   ],
  //   editorProps: {
  //     attributes: {
  //       class: 'min-h-full',
  //     },
  //   },
  //   onCreate: ({ editor }) => {
  //     if (editor.isEmpty) {
  //       editor.commands.setContent(initalContent);
  //     }
  //   },
  // });
  const editor = new Editor({
    extensions: [
      ...ExtensionKit,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: {
          name: 'Tien Anh',
          color: '#f783ac',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'min-h-full',
      },
    },
    onCreate: ({ editor }) => {
      provider?.on('sync', () => {
        if (editor.isEmpty) {
          editor.commands.setContent(initalContent);
        }
      });
    },
  });

  // const editor = new Editor({
  //   content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  //   extensions: [...ExtensionKit],
  //   editorProps: {
  //     attributes: {
  //       class: 'min-h-full',
  //     },
  //   },
  // });

  console.log('[useEditor]', editor);

  return { editor };
};
