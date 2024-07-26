import type { Editor } from '@tiptap/vue-3';
import type { ContentTypePickerOptions } from '../components/ContentTypePicker.vue';

export const useTextBubbleMenuContentTypes = (editor: Editor) => {
  const options = computed<ContentTypePickerOptions>(() => [
    {
      type: 'category',
      label: 'Hierarchy',
      id: 'hierarchy',
    },
    {
      icon: 'lucide:pilcrow',
      onClick: () =>
        editor
          .chain()
          .focus()
          .lift('taskItem')
          .liftListItem('listItem')
          .setParagraph()
          .run(),
      id: 'paragraph',
      disabled: () => !editor.can().setParagraph(),
      isActive: () =>
        editor.isActive('paragraph') &&
        !editor.isActive('orderedList') &&
        !editor.isActive('bulletList') &&
        !editor.isActive('taskList'),
      label: 'Paragraph',
      type: 'option',
    },
    {
      icon: 'lucide:heading-1',
      onClick: () =>
        editor
          .chain()
          .focus()
          .lift('taskItem')
          .liftListItem('listItem')
          .setHeading({ level: 1 })
          .run(),
      id: 'heading1',
      disabled: () => !editor.can().setHeading({ level: 1 }),
      isActive: () => editor.isActive('heading', { level: 1 }),
      label: 'Heading 1',
      type: 'option',
    },
    {
      icon: 'lucide:heading-2',
      onClick: () =>
        editor
          .chain()
          .focus()
          .lift('taskItem')
          .liftListItem('listItem')
          .setHeading({ level: 2 })
          .run(),
      id: 'heading2',
      disabled: () => !editor.can().setHeading({ level: 2 }),
      isActive: () => editor.isActive('heading', { level: 2 }),
      label: 'Heading 2',
      type: 'option',
    },
    {
      icon: 'lucide:heading-3',
      onClick: () =>
        editor
          .chain()
          .focus()
          .lift('taskItem')
          .liftListItem('listItem')
          .setHeading({ level: 3 })
          .run(),
      id: 'heading3',
      disabled: () => !editor.can().setHeading({ level: 3 }),
      isActive: () => editor.isActive('heading', { level: 3 }),
      label: 'Heading 3',
      type: 'option',
    },
    {
      type: 'category',
      label: 'Lists',
      id: 'lists',
    },
    {
      icon: 'lucide:list',
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      id: 'bulletList',
      disabled: () => !editor.can().toggleBulletList(),
      isActive: () => editor.isActive('bulletList'),
      label: 'Bullet list',
      type: 'option',
    },
    {
      icon: 'lucide:list-ordered',
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      id: 'orderedList',
      disabled: () => !editor.can().toggleOrderedList(),
      isActive: () => editor.isActive('orderedList'),
      label: 'Numbered list',
      type: 'option',
    },
    {
      icon: 'lucide:list-todo',
      onClick: () => editor.chain().focus().toggleTaskList().run(),
      id: 'todoList',
      disabled: () => !editor.can().toggleTaskList(),
      isActive: () => editor.isActive('taskList'),
      label: 'Todo list',
      type: 'option',
    },
  ]);

  return options;
};
