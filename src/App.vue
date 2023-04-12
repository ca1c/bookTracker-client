<template>
    <div id="nav">
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/search">Search</router-link>
    </div>
    <router-view />
</template>

<script>
// import Search from './components/Search.vue'

export default {
  name: 'App',
  // components: {
  //   Search
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
