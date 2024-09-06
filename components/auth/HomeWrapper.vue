<template>
  <!-- <div> -->
  <CardHeader class="grid grid-cols-3 gap-2">
    <Button @click="fnLoginGoogle">
      <Icon name="ion:logo-google" color="black" size="20px"></Icon>
    </Button>
    <Button>
      <Icon name="ion:logo-github" color="black" size="20px"></Icon>
    </Button>
    <Button>
      <Icon name="ion:logo-facebook" color="black" size="20px"></Icon>
    </Button>
    <Button class="col-span-3" @click="fnMoveToLoginTab"
      >Continue with Email</Button
    >
  </CardHeader>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { useToast } from '@/components/ui/toast';
const emit = defineEmits<{
  (e: 'changeTab', tab: 'home' | 'login' | 'signup'): void;
}>();

// Data
const { toast } = useToast();
const supabaseClient = useSupabaseClient();

// Methods
const fnMoveToLoginTab = () => {
  emit('changeTab', 'login');
};

const fnLoginGoogle = async () => {
  try {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/confirm',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    console.log('[GOOGLE LOGIN]::', data, error);

    if (error) throw error;
  } catch (error) {
    toast({
      title: 'Error',
      description:
        error instanceof Error ? error.message : 'Something went wrong',
      variant: 'destructive',
    });
  }
};
</script>

<style scoped></style>
