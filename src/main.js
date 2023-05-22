import { createApp } from 'vue';
import router from './router';
import App from './App.vue';


import 'vuetify/styles'
import { createVuetify } from 'vuetify';
// import { createStore } from 'vuex'; 
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
//#899878
// #222725

const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: '#121113',
    surface: '#222725',
    'surface-lighten-1': '#899878',
    primary: '#F7F7F2',
    'primary-darken-1': '#d9d9d4',
    secondary: '#E4E6C3',
    'secondary-darken-1': '#b8ba9c',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'myCustomDarkTheme',
    themes: {
      myCustomDarkTheme,
    }
  },
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

// const store = createStore({
//   state () {
//     return {
//       alert: false,
//       alertType: "error",
//       alertMessage: "",
//     }
//   },
//   mutations: {
//     setAlert (state) {
//       state.alert = state.alert ? false : true;
//       state.alertType = state.alertType
//     }
//   }
// })

const app = createApp(App);

// app.use(store);
app.use(vuetify);
app.use(router);
router.app = app;
app.mount('#app')
