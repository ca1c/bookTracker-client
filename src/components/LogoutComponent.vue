<script>
import axios from 'axios';
import { useCookies } from "vue3-cookies"; 

  export default {    
    setup() {
        const { cookies } = useCookies();
        return { cookies };
    },
    mounted() {
      this.APP_API_URL = process.env.VUE_APP_LOCAL_API_URL;
      const cookie = this.cookies.get('user');
      axios.post(this.APP_API_URL + 'logout', {
        id: cookie.id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      this.cookies.remove('user', {path: '/'});
      this.$router.push({path: '/login'});
    }
  }
</script>

<template>
  <div></div>
</template>
