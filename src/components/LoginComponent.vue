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
            forgotPassword: false,
            email: "",
        }
    },
    methods: {
        submit() {
            if(this.cookies.get('user')){
                this.cookies.remove('user', {path: '/'});
            }

            if(this.username.length === 0) {
                this.$store.commit('errorAlert', "username required");
                return;
            }
            if(this.password.length === 0) {
                this.$store.commit('errorAlert', "password required");
                return;
            }
            
            axios.post(this.APP_API_URL + 'login', {
                username: this.username,
                password: this.password,
            })
            .then((response) => {
                if(response.data.error) {
                    this.$store.commit('errorAlert', response.data.message);
                }
                if(response.data.user) {
                    this.$store.commit('alertOff');
                    this.cookies.set("user", {username: response.data.username, id: response.data.user}, '1d');
                    this.$router.push({path: '/dashboard'});
                }
            })
            .catch((err) => {
                console.log(err);
            })
        },
        sendChangePasswordEmail() {
            axios.post(this.APP_API_URL + 'forgotPasswordEmail', {
                email: this.email
            })
            .then((response) => {
                if(response.data.error) {
                    this.$store.commit('errorAlert', response.data.message);
                }
                else {
                    this.$store.commit('successAlert', response.data.message);
                }
            })
            .catch((error) => {
                this.$store.commit('errorAlert', "Request Error");
                console.log(error);
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
                    this.$router.push({path: '/dashboard'});
                }
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
        <v-sheet width="300" class="mx-auto">
            <p class="text-h4 text-center">Login</p>
            <v-card elevation="3">
                <v-form fast-fail @submit.prevent>
                <v-text-field
                    v-model="username"
                    label="username"
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    label="password"
                    type="password"
                ></v-text-field>

                <v-btn block class="mt-2" variant="plain" @click="this.forgotPassword = true">Forgot Password?</v-btn>

                <v-form v-if="forgotPassword">
                    <v-text-field
                    v-model="email"
                    label="email"
                    ></v-text-field>
                    <v-btn block class="mt-2" @click="this.sendChangePasswordEmail">Send Email</v-btn>
                </v-form>

                <v-btn type="submit" block class="mt-2" @click="this.submit">Submit</v-btn>

                </v-form>
                <v-alert
                    v-if="this.$store.state.alert"
                    :type="this.$store.state.alertType"
                    title="Alert"
                    :text="this.$store.state.alertMessage"
                ></v-alert>
            </v-card>
        </v-sheet>
    </v-container>
    </v-app>
</template>

<style>
</style>