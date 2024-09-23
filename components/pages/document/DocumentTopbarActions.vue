<template>
  <div class="document-topbar-actions">
    <div class="flex">
      <Button variant="ghost" class="h-7 px-2 font-normal"> Share </Button>
      <!-- <Button variant="ghost" size="icon" class="h-7 w-7">
        <Icon name="lucide:message-square-text" size="16px" />
      </Button>
      <Button variant="ghost" size="icon" class="h-7 w-7">
        <Icon name="lucide:clock-9" size="16px" />
      </Button> -->
      <!-- <Button variant="ghost" size="icon" class="h-7 w-7">
        <Icon name="lucide:star" size="16px" />
      </Button> -->
      <Button variant="ghost" size="icon" class="h-7 w-7">
        <Icon name="iconoir:message-text-solid" size="16px" />
      </Button>
      <Button variant="ghost" size="icon" class="h-7 w-7">
        <Icon name="ph:clock-fill" size="16px" />
      </Button>
      <Button variant="ghost" size="icon" class="h-7 w-7">
        <Icon name="ph:star-bold" size="16px" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
</script>

<style scoped></style>
