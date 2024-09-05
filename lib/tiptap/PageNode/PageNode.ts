import { Extension, Node, mergeAttributes } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import PageNodeComponent from './PageNode.vue';
import { EDITOR_CONTENT } from '~/lib/constants';

export interface PageNodeOptions {}

// export const PageNode = Extension.create<PageNodeOptions>({
//   name: 'pageNode',
// });

export const PageNode = Node.create({
  name: 'pageNode',

  // content: 'block',
  content: 'inline*',

  group: 'block',

  atom: true,

  draggable: true,

  parseHTML() {
    return [
      {
        // tag: `div[data-type="${this.name}"]`,
        tag: `pageNode`,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    console.debug('[RENDER HTML - PAGENODE] Options', this.options);

    return [
      `pageNode`,
      mergeAttributes(HTMLAttributes, this.options.HTMLAttributes),
      // mergeAttributes(HTMLAttributes, {
      //   'data-type': this.name,
      // }),
      0,
    ];
  },

  addAttributes() {
    return {
      href: {
        isRequired: true,
        parseHTML: element => element.getAttribute('href'),
        renderHTML: attributes => ({
          href: attributes.href,
        }),
      },
      icon: {
        default: EDITOR_CONTENT.DEFAULT_PAGE_ICON,
        parseHTML: element => element.getAttribute('icon'),
        renderHTML: attributes => ({
          icon: attributes.icon,
        }),
      },
      title: {
        default: 'Untitled',
        parseHTML: element => element.getAttribute('title'),
      },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(PageNodeComponent);
  },
});
