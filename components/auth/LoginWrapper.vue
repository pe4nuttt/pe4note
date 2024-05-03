<template>
  <CardHeader class="text-center">
    <CardTitle>Login</CardTitle>
  </CardHeader>
  <CardContent>
    <form
      @submit.prevent="onSubmit"
      class="w-full sm:justify-center space-y-6 flex flex-col"
    >
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormControl>
            <Input type="text" placeholder="Email" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormControl>
            <Input
              type="password"
              placeholder="Password"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit">
        <span>Log in</span>
      </Button>
    </form>
  </CardContent>
  <CardFooter>
    <div class="text-center w-full">
      <span class="hover:underline font-medium" @click="onChangeTab('signup')">
        Don't have an account? Sign up.
      </span>
      <p
        class="text-muted-foreground cursor-pointer"
        @click="onChangeTab('home')"
      >
        Go back
      </p>
    </div>
  </CardFooter>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import HomeWrapper from '~/components/auth/HomeWrapper.vue';
import { useToast } from '../ui/toast';
import { LoginFormSchema } from '~/lib/types';

// Interfaces
interface LoginForm {
  email: string;
  password: string;
}

type AuthTab = 'home' | 'login' | 'signup';
const emit = defineEmits<{
  (e: 'changeTab', tab: 'home' | 'login' | 'signup'): void;
}>();

// Data
const { toast } = useToast();
const client = useSupabaseClient();
const formSchema = toTypedSchema(LoginFormSchema);

const {
  values: formData,
  errors,
  isSubmitting,
  handleSubmit,
} = useForm<z.infer<typeof LoginFormSchema>>({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
  },
});

// METHODS
const onSubmit = handleSubmit(async values => {
  // try {
  //   const res = await actionSignInUser({
  //     email: values.email as string,
  //     password: values.password as string,
  //   });
  //   console.log('RES::', res);
  //   if (res.error) throw res.error;
  //   router.push('/dashboard');
  // } catch (error) {
  //   if (error instanceof Error) {
  //     alert(error.message);
  //   }
  // }
  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    console.log('[SIGN IN]::', data, error);
    if (error) throw error;
    navigateTo('/');
  } catch (error) {
    console.log('[ERROR]::', error);
    toast({
      title: 'Error',
      description:
        error instanceof Error ? error.message : 'Something went wrong',
      variant: 'destructive',
    });
  }
});

const onChangeTab = (tab: AuthTab) => {
  emit('changeTab', tab);
};
</script>

<style scoped></style>
