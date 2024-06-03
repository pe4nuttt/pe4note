<template>
  <div class="flex mx-2 items-center justify-between">
    <Button variant="default">
      <Icon name="radix-icons:plus" size="18px" />
      <div class="ml-1">New Page</div>
    </Button>

    <Button
      v-tooltip="'New Folder or Page'"
      variant="ghost"
      size="icon"
      class="text-muted-foreground"
    >
      <Icon
        name="ph:folder-simple-plus-fill"
        size="18px"
        color="currentColor"
      />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
</script>

<style scoped></style>
