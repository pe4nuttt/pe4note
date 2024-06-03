<template>
  <div></div>
</template>

<script setup lang="ts">
type MenuItem = {
  label?: string;
  icon?: string;
  command?: () => void;
  items?: MenuItem[];
  class?: any;
  key?: any;
};

type Seperator = {
  seperator: boolean;
};

type Props = {
  menuItems: (MenuItem | Seperator)[];
};

const props = defineProps();

// Data
const pageX = ref<number>();
const pageY = ref<number>();
const visible = ref(false);

// Methods
const show = (event: MouseEvent) => {
  pageX.value = event.pageX;
  pageY.value = event.pageY;

  visible.value ? position() : (visible.value = true);

  event.stopPropagation();
  event.preventDefault();
};

const toggle = (event: MouseEvent) => {
  visible.value ? hide() : show(event);
};

const hide = () => {};

const position = () => {};

defineExpose({
  hide,
  show,
  position,
  toggle,
});
</script>

<style scoped></style>
