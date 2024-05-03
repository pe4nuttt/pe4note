<template>
  <div id="login" class="flex flex-col justify-center items-center h-full">
    <!-- Title -->
    <h2 class="text-3xl leading-9 font-semibold mb-2">Welcome</h2>

    <!-- Description -->
    <div
      class="w-80 mx-auto text-center mb-5 text-muted-foreground font-medium"
    >
      Capture notes, track your progress, create a knowledge base
    </div>

    <div id="login-wrapper" class>
      <Card class="w-80 bg-[#191c22] border-none">
        <HomeWrapper @changeTab="onChangeTab" v-if="authTab === 'home'" />
        <template v-else-if="authTab === 'login'">
          <LoginWrapper @changeTab="onChangeTab" />
        </template>
        <template v-else>
          <SignupWrapper @changeTab="onChangeTab" />
        </template>
      </Card>
    </div>
  </div>
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
import LoginWrapper from '~/components/auth/LoginWrapper.vue';
import SignupWrapper from '~/components/auth/SignupWrapper.vue';

definePageMeta({
  layout: 'auth',
});

// Interfaces
interface LoginForm {
  email: string;
  password: string;
}

type AuthTab = 'home' | 'login' | 'signup';

// Data
const formSchema = toTypedSchema(
  z.object({
    email: z.string().nonempty('Field is requried').email().min(2).max(50),
    password: z.string().nonempty('Field is required').min(2).max(20),
  }),
);

const {
  values: formData,
  errors,
  isSubmitting,
  handleSubmit,
} = useForm<LoginForm>({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
  },
});

const authTab = ref<AuthTab>('home');

// Hooks
onMounted(async () => {
  const data = await useFetch('/api/test');
});

// Methods
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
});

const onChangeTab = (tab: AuthTab) => {
  console.log('CHANGE TAB::', tab);
  authTab.value = tab;
};
</script>

<style scoped></style>
