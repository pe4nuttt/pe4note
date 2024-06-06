<template>
  <div
    ref="renameDialogRef"
    v-if="modelValue"
    class="fixed rounded-md py-1 px-2 border border-border bg-popover w-full min-w-60 max-w-[400px] shadow-lg"
    :style="{
      top: `${position.y}px`,
      left: `${position.x}px`,
    }"
    :class="[
      {
        block: isShow,
      },
    ]"
  >
    <div class="flex items-center">
      <div
        class="mr-1.5 w-7 h-7 flex items-center justify-center rounded-sm hover:bg-accent"
      >
        <EmojiPicker ref="emojiPickerRef" v-model="emojiInput">
          <template v-slot="slotProps">
            <span class="text-base">{{ slotProps.value }}</span>
          </template>
        </EmojiPicker>
      </div>
      <Input
        class="flex-1 h-7 rounded-sm bg-primary-foreground"
        placeholder="Untitled"
        v-model="nameInput"
      />
      <Button
        class="ml-2 !h-7 !w-7 rounded-sm"
        size="icon"
        variant="ghost"
        @click="handleSubmit"
      >
        <Icon name="ph:check-circle-fill" size="20px" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { autoUpdate, computePosition, flip, shift } from '@floating-ui/dom';
import EmojiPicker from '@/components/global/EmojiPicker/index.vue';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/button/Button.vue';

interface Props {
  modelValue: boolean;
  floatWrapperId?: string | null;
  type?: 'folder' | 'file';
  data?: {
    name?: string;
    iconId?: string;
    [key: string]: any;
  };
}

const props = withDefaults(defineProps<Props>(), {
  type: 'folder',
  data: () => ({
    name: '🗒️',
    iconId: '',
  }),
});

const emits = defineEmits<{
  'update:modelValue': [modelValue: boolean];
  submit: [
    value: {
      emoji: '';
      title: '';
    },
  ];
}>();

// Data
const renameDialogRef = ref(null);
const emojiInput = ref('🗒️');
const nameInput = ref('');
const position = ref<{
  x: number;
  y: number;
}>({
  x: 0,
  y: 0,
});
const isShow = ref(true);
const cleanUp = ref<() => void>();
const emojiPickerRef = ref(null);

// Watch
watch(
  () => props.modelValue,
  async value => {
    emojiInput.value = props.data.iconId || '';
    nameInput.value = props.data.name || '';
    await nextTick();
    if (value) {
      updatePosition();
    } else {
      resetPosition();
      resetData();
      if (cleanUp.value) cleanUp.value();
    }
  },
);

// Methods
const fnHideDialog = () => {
  console.log('[fnHideDialog]', (emojiPickerRef.value as any)?.emojiPickerRef);
  if ((emojiPickerRef.value as any)?.emojiPickerRef) {
  } else {
    emits('update:modelValue', false);
  }
};

const updatePosition = () => {
  if (props.floatWrapperId) {
    const floatingEle = document.getElementById(props.floatWrapperId);
    const refEle = unrefElement(renameDialogRef);
    if (floatingEle && refEle) {
      computePosition(floatingEle, refEle, {
        strategy: 'fixed',
        placement: 'bottom',
        middleware: [flip(), shift()],
      }).then(({ x, y }) => {
        position.value = {
          x: x,
          y: y,
        };
      });
    }
  }

  // computePosition(renameDialogRef.value)
};

const resetPosition = () => {
  position.value = {
    x: 0,
    y: 0,
  };
};

const resetData = () => {
  emojiInput.value = '';
  nameInput.value = '';
};

const handleSubmit = () => {
  emits('submit', {
    emoji: emojiInput.value,
    title: nameInput.value,
  });
};

onClickOutside(renameDialogRef, fnHideDialog, {
  ignore: [emojiPickerRef.value?.emojiPickerRef] || undefined,
});

onMounted(() => {});
</script>

<style scoped></style>
