<template>
    <v-app>
      <v-toolbar color="surface">

        
        <v-toolbar-title>
          <router-link 
            :to="this.cookies.get('user') ? '/dashboard' : '/'"
            style="text-decoration: none; color: inherit;"
            >
              myBook
            </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-tabs>
          <div v-if="this.cookies.get('user')">
              <v-tab :value="1" to="/dashboard" replace><v-icon>mdi-book-open-variant</v-icon></v-tab>
              <v-tab :value="2" to="/search" replace><v-icon>mdi-magnify</v-icon></v-tab>
              <v-tab :value="3" to="/logout" replace><v-icon>mdi-logout-variant</v-icon></v-tab>
          </div>
          <div v-else>
              <v-tab :value="1" to="/" replace><v-icon>mdi-home</v-icon></v-tab>
              <v-tab :value="2" to="/login" replace><v-icon>mdi-login</v-icon></v-tab>
              <v-tab :value="3" to="/register" replace><v-icon>mdi-account-plus-outline</v-icon></v-tab>
          </div>
        </v-tabs>
      </v-toolbar>
      <router-view :key="$route.fullPath"/>

      <v-footer color="surface" class="text-center d-flex flex-column" app="true">
        <div>
          Made with ⚡ by 
        </div>
        <div>
          <v-btn
            append-icon="mdi-github"
            href="https://github.com/ca1c"
          >

            ca1c

            <template v-slot:append>
              <v-icon></v-icon>
            </template>
          </v-btn>
        </div>
      </v-footer>
    </v-app>
</template>

<script>
import { useCookies } from "vue3-cookies";

export default {
  name: 'App',
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      session: null,
    }
  },
  mounted() {
    this.session = this.cookies.get("user");
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
} */
ul {
  list-style-type: none;
}
</style>
