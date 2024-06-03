import MyPreset from '../assets/mypreset';
import PrimeVue from 'primevue/config';

export default defineNuxtPlugin(app => {
  app.vueApp.use(PrimeVue, { unstyled: true, pt: MyPreset });
});
