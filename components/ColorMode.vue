<template>
  <div>
    <div>COLOR:: {{ colorMode.value }}</div>
    <Button @click="toggleTheme"> Toggle Color </Button>
  </div>
</template>

<script setup>
import Button from './ui/button/Button.vue';
const colorMode = useColorMode();

// Methods
const toggleTheme = () => {
  console.log(colorMode);
  if (colorMode.preference === 'light') {
    colorMode.preference = 'dark';
  } else {
    colorMode.preference = 'light';
  }
};
</script>

<style lang="scss" scoped></style>
