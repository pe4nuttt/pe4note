export default {
  root: {
    class: [
      // Sizing and Shape
      'min-w-[12rem]',
      'rounded-md',
      'shadow-md',

      // Spacing
      'p-1',

      // Colors
      'bg-popover',
      'text-popover-foreground',
      'border border-border',
    ],
  },
  menu: {
    class: [
      // Spacings and Shape
      'list-none',
      'm-0',
      'p-0',
      'outline-none',
    ],
  },
  menuitem: {
    class: 'relative',
  },
  content: ({ context }) => ({
    class: [
      //Shape
      'rounded-sm',
      // Colors
      'text-popover-foreground dark:text-white/80',
      {
        'text-accent-foreground': !context.focused && !context.active,
        'text-accent-foreground bg-accent': context.focused && !context.active,
        'text-accent-foreground bg-accent':
          (context.focused && context.active) ||
          context.active ||
          (!context.focused && context.active),
      },

      // Transitions
      'transition-shadow',
      'duration-200',

      // States
      {
        'hover:bg-accent': !context.active,
        'hover:bg-accent text-accent-foreground': context.active,
      },

      // Disabled
      { 'opacity-60 pointer-events-none cursor-default': context.disabled },
    ],
  }),
  action: {
    class: [
      'relative',
      // Flexbox

      'flex',
      'items-center',

      // Spacing
      'py-[6px]',
      'px-2',

      // Color
      'text-popover-foreground',

      // Misc
      'no-underline',
      'overflow-hidden',
      'cursor-pointer',
      'select-none',
    ],
  },
  icon: {
    class: [
      // Spacing
      'mr-2',

      // Color
      'text-surface-600 dark:text-white/70',
    ],
  },
  label: {
    class: ['text-sm', 'ml-2'],
  },
  submenu: ({ props }) => ({
    class: [
      // Size
      'w-full sm:w-48',

      // Spacing
      'py-1',
      'm-0',
      'list-none',

      // Shape
      'shadow-md',
      'rounded-md',
      'border border-border',

      // Position
      'static sm:absolute',
      'z-10',
      { 'sm:absolute sm:left-full sm:top-0': props.level > 1 },

      // Color
      'bg-popover',
    ],
  }),
  submenuicon: {
    class: ['ml-auto'],
  },
  separator: {
    class: 'border-t border-border my-1',
  },
  transition: {
    enterFromClass: 'opacity-0',
    enterActiveClass: 'transition-opacity duration-250',
  },
};
