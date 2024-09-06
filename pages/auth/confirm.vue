<template>
  <div></div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});

const user = useSupabaseUser();
const route = useRoute();

if (!route.query.code) navigateTo('/auth/login');

watch(
  user,
  () => {
    if (user.value) {
      // Redirect to protected page
      return navigateTo('/');
    }

    // return navigateTo('/auth/login');
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped></style>
