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
      let vm = this;
      axios.post(this.APP_API_URL + 'logout', {
        id: this.cookies.get('user'),
      })
      .then((response) => {
        console.log(response);
        console.log(this.cookies.get('user'));
        vm.cookies.remove('user');
      })
      .catch((error) => {
        console.log(error);
      })

      this.$router.push({path: '/login'});
    }
  }
</script>

<template>
  <div></div>
</template>
