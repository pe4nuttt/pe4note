<template>
  <div class="group">
    <div
      id="entity-header-controls"
      class="flex opacity-0 group-hover:visible group-hover:opacity-100 duration-150 transition-opacity ease-in-out invisible"
    >
      <!-- Add icon -->
      <Button variant="ghost" class="text-sm px-2 py-1 h-7 font-normal">
        <Icon class="mr-2" name="ph:smiley-fill" size="16px" />
        Add Icon
      </Button>

      <!-- Add cover -->
      <Button variant="ghost" class="text-sm px-2 py-1 h-7 font-normal">
        <Icon class="mr-2" name="ph:image-fill" size="16px" />
        Add cover
      </Button>

      <!-- Add comment -->
      <Button variant="ghost" class="text-sm px-2 py-1 h-7 font-normal">
        <Icon class="mr-2" name="iconoir:message-text-solid" size="16px" />
        Add comment
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
</script>

<style scoped></style>
