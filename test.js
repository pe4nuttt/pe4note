import { getThemeReplacementsValues } from './utils/tailwindViewer.js';

const themeReplacementsValues = getThemeReplacementsValues(
  './assets/styles/tailwind.scss',
);

console.log(themeReplacementsValues);
