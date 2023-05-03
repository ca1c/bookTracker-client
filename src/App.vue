<template>
    <v-app>
      <v-toolbar color="primary">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>myBook</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-tabs>
          <router-link to="/" style="text-decoration: none; color: inherit;">
            <v-tab value="one" ><v-icon>mdi-book-open-variant</v-icon></v-tab>
          </router-link>
          <router-link to="/search" style="text-decoration: none; color: inherit;">
            <v-tab value="two"><v-icon>mdi-magnify</v-icon></v-tab>
          </router-link>
          <router-link to="/login" style="text-decoration: none; color: inherit;">
            <v-tab value="three"><v-icon>mdi-login</v-icon></v-tab>
          </router-link>
          <router-link to="/register" style="text-decoration: none; color: inherit;">
            <v-tab value="four"><v-icon>mdi-account-plus-outline</v-icon></v-tab>
          </router-link>
          <router-link to="/logout" style="text-decoration: none; color: inherit;">
            <v-tab value="five"><v-icon>mdi-logout-variant</v-icon></v-tab>
          </router-link>
        </v-tabs>
      </v-toolbar>
      <router-view/>
    </v-app>
</template>

<script>

export default {
  name: 'App',
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
