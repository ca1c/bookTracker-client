<script>
import axios from 'axios';
import { useCookies } from "vue3-cookies";

export default {
    setup() {
        const { cookies } = useCookies();
        return { cookies };
    },
    data() {
        return {
            APP_API_URL: "",
            username: "",
            password: "",
        }
    },
    methods: {
        submit() {
            if(this.cookies.get('user')){
                this.cookies.remove('user', {path: '/'});
            }
            
            axios.post(this.APP_API_URL + 'login', {
                username: this.username,
                password: this.password,
            })
            .then((response) => {
                if(response.data.user) {
                    this.cookies.set("user", response.data.user, '1d');
                }
                
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.APP_API_URL = process.env.VUE_APP_LOCAL_API_URL;
        
        if(this.cookies.get('user') !== null) {
            axios.post(this.APP_API_URL + 'authenticateFront', {
                id: this.cookies.get("user"),
            }).then((response) => {
                if(response.data.session) {
                    console.log('ran');
                    this.$router.push({path: '/'});
                }
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },
}
</script>

<template>
    <h1>Login</h1>
    <form class="form" @submit.prevent="onSubmit">
        <label>username:</label>
        <input type="text" @input="event => this.username = event.target.value">
        <label>password</label>
        <input type="password" @input="event => this.password = event.target.value">
        <button type="submit" @click="this.submit">Login</button>
    </form>
</template>

<style>
</style>