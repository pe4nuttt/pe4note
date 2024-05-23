// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    // '@vee-validate/nuxt',
    '@scalar/nuxt',
    '@nuxt/image',
  ],
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/auth/login',
      callback: '/',
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },
  tailwindcss: {
    cssPath: ['~/assets/styles/tailwind.scss', { injectPosition: 'last' }],
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
  },
  image: {
    providers: {
      myProvider: {
        name: 'supabaseProvider', // optional value to overrider provider name
        provider: '~/providers/imageProvider.ts', // Path to custom provider
        options: {
          // ... provider options
          baseURL: 'ywwdqpsdrfzxsazuyiss.supabase.co',
        },
      },
    },
  },
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
  scalar: {
    pathRouting: {
      basePath: '/scalar',
    },
  },
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_PASSWORD: process.env.SUPABASE_PASSWORD,
  },
});
