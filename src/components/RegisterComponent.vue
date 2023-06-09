<script>
import axios from 'axios';
import { useCookies } from "vue3-cookies";
import * as EmailValidator from 'email-validator';
import * as passwordValidator from 'password-validator';

    export default {
        setup() {
            const { cookies } = useCookies();
            return { cookies };
        },
        data() {
            return {
                APP_API_URL: "",
                email: "",
                emailRules: [
                    value => {
                        if (EmailValidator.validate(value)) return true

                        return 'Please enter a valid Email.'
                    },
                ],
                username: "",
                usernameRules: [
                    value => {
                        if (value?.length > 2) return true

                        return 'First name must be at least 3 characters.'
                    },
                ],
                password: "",
                passwordRules: [
                    value => this.passwordValidation(value)
                ],
                passwordConfirmation: "",
                resendEmailButton: false
            }
        },
        methods: {
            validateForm() {
                if (this.passwordValidation(this.password) !== true) return false;
                if (!this.username?.length > 2) return false;
                if (!EmailValidator.validate(this.email)) return false;
                if (this.password !== this.passwordConfirmation) {
                    this.$store.commit("errorAlert", "Passwords should match");
                    return false;
                }

                return true;
            },
            passwordValidation(value) {
                const schema = new passwordValidator();

                schema
                .is().min(8)                                    // Minimum length 8
                .is().max(100)                                  // Maximum length 100
                .has().uppercase()                              // Must have uppercase letters
                .has().lowercase()                              // Must have lowercase letters
                .has().digits(1)                                // Must have at least 1 digits
                .has().not().spaces();                          // Should not have spaces

                if (schema.validate(value)) return true;

                return 'Password should be 8 characters long, at least 1 digit, 1 uppercase and lowercase letter, no spaces'
            },
            submit() {
                if(!this.validateForm()) {
                    return;
                }

                axios.put(this.APP_API_URL + 'createUser', {
                    email: this.email,
                    username: this.username,
                    password: this.password,
                })
                .then((response) => {
                    if(response.data.error) {
                        this.$store.commit('errorAlert', response.data.message);
                    }
                    else {
                        this.resendEmailButton = true;
                        this.$store.commit('successAlert', response.data.message);
                    }
                })
                .catch((err) => {
                    this.$store.commit('errorAlert', "Request Error");
                    console.log(err);
                })
            },
            resendEmail() {
                axios.post(this.APP_API_URL + 'resendConfirmationEmail', {
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
                    console.log(error);
                    this.$store.commit('errorAlert', "Request Error");
                })
            }
        },
        mounted() {
            this.APP_API_URL = process.env.VUE_APP_LOCAL_API_URL;

            axios.post(this.APP_API_URL + 'authenticateFront', {
                id: this.cookies.get("user"),
            }).then((response) => {
                if(response.data.session) {
                    this.$router.push({path: '/dashboard'});
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
</script>

<template>
    <v-app>
    <v-container>
        
        <v-sheet width="300" class="mx-auto">
            <p class="text-h4 text-center">Register</p>
            <v-card elevation="3">
                <v-form fast-fail @submit.prevent>
                    <v-text-field
                        v-model="email"
                        label="email"
                        type="email"
                        :rules="emailRules"
                    ></v-text-field>

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

                    <v-text-field
                        v-model="passwordConfirmation"
                        label="confirm password"
                        type="password"
                    ></v-text-field>

                    <v-btn type="submit" block class="mt-2" @click="this.submit">Submit</v-btn>
                    <v-btn v-if="this.resendEmailButton" block class="mt-2" variant="plain" @click="this.resendEmail">Resend Email</v-btn>
                </v-form>
                <v-fade-transition>
                    <v-alert
                        v-if="this.$store.state.alert"
                        :type="this.$store.state.alertType"
                        title="Alert"
                        :text="this.$store.state.alertMessage"
                    ></v-alert>
                </v-fade-transition>
            </v-card>
        </v-sheet>
    </v-container>
    </v-app>
    <!-- <h1>Register</h1>
    <form class="form" @submit.prevent="onSubmit">
        <label>email:</label>
        <input type="email" @input="event => this.email = event.target.value">
        <label>username:</label>
        <input type="text" @input="event => this.username = event.target.value">
        <label>password</label>
        <input type="password" @input="event => this.password = event.target.value">
        <button type="submit" @click="this.submit">register</button>
    </form> -->
</template>

<style>
.form {
    width: 200px;
}
</style>