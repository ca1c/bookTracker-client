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
                    this.cookies.set("user", {username: response.data.username, id: response.data.user}, '1d');
                    this.$router.push({path: '/'});
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
                console.log(response);
                if(response.data.session) {
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
    <v-app>
    <v-container>
        <p class="text-h4 text-center">Login</p>
        <v-sheet width="300" class="mx-auto">
            <v-card elevation="3">
                <v-form fast-fail @submit.prevent>
                <v-text-field
                    v-model="username"
                    label="username"
                    :rules="usernameRules"
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    label="password"
                    type="password"
                    :rules="passwordRules"
                ></v-text-field>

                <v-btn type="submit" block class="mt-2" @click="this.submit">Submit</v-btn>
                </v-form>
            </v-card>
        </v-sheet>
    </v-container>
    </v-app>

    <!-- <form class="form" @submit.prevent="onSubmit">
        <label>username:</label>
        <input type="text" @input="event => this.username = event.target.value">
        <label>password</label>
        <input type="password" @input="event => this.password = event.target.value">
        <button type="submit" @click="this.submit">Login</button>
    </form> -->
</template>

<style>
</style>