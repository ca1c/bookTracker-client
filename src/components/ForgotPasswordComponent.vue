<script>
// import axios from 'axios';
// import BookComponent from './BookComponent.vue';
// import _ from 'lodash';
import axios from "axios";
import { useCookies } from "vue3-cookies";
import * as passwordValidator from 'password-validator';    

export default {
  setup() {
      const { cookies } = useCookies();
      return { cookies };
  },
  data() {
    return {
        password: "",
        confirmPassword: "",
        passwordRules: [ value => this.passwordRulesFunc(value) ],
        alert: false,
        alertType: "error",
        alertMessage: ""
    }
  },
  methods: {
    submit() {
        const id = this.$route.query.id;

        console.log(id);

        if(!id) {
            this.alert = true;
            this.alertType = "error";
            this.alertMessage = "please submit a change password request first"
            return;
        }

        if(!this.passwordRulesFunc(this.password) && this.password !== this.confirmPassword) {
            this.alert = true;
            this.alertType = "error";
            this.alertMessage = "passwords should match";
            return;
        }

        axios.post(this.APP_API_URL + 'forgotPassword', {
            id: id,
            password: this.confirmPassword,
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
        });
    },
    passwordRulesFunc(value) {
        const schema = new passwordValidator();

        schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(1)                                // Must have at least 1 digits
        .has().not().spaces()                           // Should not have spaces

        if (schema.validate(value)) return true;

        return 'Password should be 8 characters long, at least 1 digit, 1 uppercase and lowercase letter, no spaces'
    }
  },
  mounted() {
    this.APP_API_URL = process.env.VUE_APP_LOCAL_API_URL;
  }
}
</script>

<template>
  <v-container class="mb-16">
    <p class="text-h4">Change Password</p>
    <v-sheet max-width="500" class="mx-auto">
        <v-form v-model="valid">
            <v-container>
                <v-text-field
                    type="password"
                    v-model="password"
                    label="new password"
                    :rules=this.passwordRules
                ></v-text-field>
                <v-text-field
                    type="password"
                    v-model="confirmPassword"
                    label="confirm new password"
                ></v-text-field>
                <v-btn block class="mt-2" @click="this.submit">Change Password</v-btn>
            </v-container>
        </v-form>
        <v-alert
            v-if="this.alert"
            :type="this.alertType"
            title="Alert"
            :text="this.alertMessage"
        ></v-alert>
    </v-sheet>
  </v-container>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>