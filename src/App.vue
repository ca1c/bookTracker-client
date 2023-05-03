<template>
    <v-app>
      <v-toolbar color="primary">

        <v-toolbar-title>myBook</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-tabs>
          <router-link to="/" style="text-decoration: none; color: inherit;">
            <v-tab value="one" ><v-icon>mdi-book-open-variant</v-icon></v-tab>
          </router-link>
          <router-link to="/search" style="text-decoration: none; color: inherit;">
            <v-tab value="two"><v-icon>mdi-magnify</v-icon></v-tab>
          </router-link>
          <div v-if="this.cookies.get('user')">
            <router-link to="/logout" style="text-decoration: none; color: inherit;">
              <v-tab value="five"><v-icon>mdi-logout-variant</v-icon></v-tab>
            </router-link>
          </div>
          <div v-else>
            <router-link to="/login" style="text-decoration: none; color: inherit;">
              <v-tab value="three"><v-icon>mdi-login</v-icon></v-tab>
            </router-link>
            <router-link to="/register" style="text-decoration: none; color: inherit;">
              <v-tab value="four"><v-icon>mdi-account-plus-outline</v-icon></v-tab>
            </router-link>
          </div>
        </v-tabs>
      </v-toolbar>
      <router-view :key="$route.fullPath"/>
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
