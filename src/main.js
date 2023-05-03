import { createApp } from 'vue';
import router from './router';
import App from './App.vue';


import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import { globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
  expireTimes: "1d",
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None",
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  }
})

const app = createApp(App);
app.use(vuetify);
app.use(router);
router.app = app;
app.mount('#app')
