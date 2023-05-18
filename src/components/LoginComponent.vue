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
            alert: false,
            alertType: "error",
            alertMessage: "",
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
                this.alert = true;
                this.alertType = "error";
                this.alertMessage = "username required";
                return;
            }
            if(this.password.length === 0) {
                this.alert = true;
                this.alertType = "error";
                this.alertMessage = "password required";
                return;
            }
            
            axios.post(this.APP_API_URL + 'login', {
                username: this.username,
                password: this.password,
            })
            .then((response) => {
                if(response.data.error) {
                    this.alertMessage = response.data.message;
                    this.alertType = "error";
                    this.alert = true;
                }
                if(response.data.user) {
                    this.alert = false;
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
                    this.alert = true;
                    this.alertType = "error";
                    this.alertMessage = response.data.message;
                }
                else {
                    this.alert = true;
                    this.alertType = "success";
                    this.alertMessage = response.data.message;
                }
            })
            .catch((error) => {
                this.alert = true;
                this.alertType = "error";
                this.alertMessage = "Request Error";
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
                    v-if="this.alert"
                    :type="this.alertType"
                    title="Alert"
                    :text="this.alertMessage"
                ></v-alert>
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