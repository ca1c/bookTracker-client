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
                email: "",
                username: "",
                password: "",
            }
        },
        methods: {
            submit() {
                axios.post(this.APP_API_URL + 'createUser', {
                    email: this.email,
                    username: this.username,
                    password: this.password,
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        },
        mounted() {
            this.APP_API_URL = process.env.VUE_APP_LOCAL_API_URL;

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
    }
</script>

<template>
    <h1>Register</h1>
    <form class="form" @submit.prevent="onSubmit">
        <label>email:</label>
        <input type="email" @input="event => this.email = event.target.value">
        <label>username:</label>
        <input type="text" @input="event => this.username = event.target.value">
        <label>password</label>
        <input type="password" @input="event => this.password = event.target.value">
        <button type="submit" @click="this.submit">register</button>
    </form>
</template>

<style>
.form {
    width: 200px;
}
</style>