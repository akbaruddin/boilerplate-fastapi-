import App from "./App.svelte";
import { locale } from "./i18n";

locale.subscribe((value) => {
  document.documentElement.lang = value;
});

const app = new App({
  target: document.querySelector("#main"),
});

export default app;
