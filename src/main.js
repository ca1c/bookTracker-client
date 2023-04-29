import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

import { globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
  expireTimes: "1d",
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None",
});

const app = createApp(App);
app.use(router);
router.app = app;
app.mount('#app')
