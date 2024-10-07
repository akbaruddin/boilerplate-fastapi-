import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";

import en from "./locales/en";
import ja from "./locales/ja";

const app = createApp(App);
const pinia = createPinia();

const i18n = createI18n({
  locale: "ja",
  fallbackLocale: "en",
  messages: {
    en,
    ja,
  },
  legacy: false,
});

app.use(pinia);
app.use(i18n);
app.use(router);
app.mount("#main");
