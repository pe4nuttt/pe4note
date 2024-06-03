<template>
  <nav>
    <ul class="flex flex-col gap-2 text-neutral-300">
      <li
        class="flex items-center gap-2 cursor-pointer group/native hover:text-neutral-100 hover:bg-muted px-2 py-[6px] rounded-md"
      >
        <AppHomeIcon />
        <span>My Workspace</span>
      </li>
      <li
        class="flex items-center gap-2 cursor-pointer group/native hover:text-neutral-100 hover:bg-muted px-2 py-[6px] rounded-md"
      >
        <Icon
          name="lucide:calendar-days"
          color="text-muted-foreground"
          size="20px"
        ></Icon>
        <span>Calendar</span>
      </li>
      <li
        class="flex items-center gap-2 cursor-pointer group/native hover:text-neutral-100 hover:bg-muted px-2 py-[6px] rounded-md"
      >
        <AppTrashIcon />
        <span>Trash</span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import AppHomeIcon from '~/components/icons/AppHomeIcon.vue';
import AppTrashIcon from '~/components/icons/AppTrashIcon.vue';
import AppCalendarIcon from '~/components/icons/AppCalendarIcon.vue';
</script>

<style scoped></style>
