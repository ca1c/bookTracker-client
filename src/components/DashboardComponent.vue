<script>
  import BookComponent from './BookComponent.vue';
  import axios from 'axios';
  import { useCookies } from "vue3-cookies";
  import * as passwordValidator from 'password-validator';

  export default {
    setup() {
        const { cookies } = useCookies();
        return { cookies };
    },
    components: {
      BookComponent,
    },
    data() {
      return {
        APP_API_URL: "",
        books: [],
        rows: 0,
        dialog: false,
        emptyBooks: null,
        user: this.cookies.get("user") || undefined,
        newUsername: "",
        password: "",
        oldPassword: "",
        newPassword: "",
        alert: false,
        alertType: "error",
        usernameRules: [
            value => {
              if (value?.length > 2) return true

              return 'First name must be at least 3 characters.'
            },
        ],
        passwordRules: [
          value => {
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
          },
        ],
        alertMessage: "",
      }
    },
    methods: {
      getBooks() {
        if(this.user) {
          const cookie = this.cookies.get("user");

          axios.get(`${this.APP_API_URL}readBookDoc?username=${this.user.username}&session=${cookie.id}`)
            .then((response) => {
              this.books = response.data;
              this.emptyBooks = this.books.length === 0;
              this.rows = Math.ceil((this.books.length + 1) / 3);
              console.log(this.books);
            })
        }
      },
      editBook(i, progress) {
        const cookie = this.cookies.get("user");

        let book = this.books[i];
        axios.post(this.APP_API_URL + 'editBook', {
          _id: book._id,
          username: this.user.username,
          progress: progress.toString(),
          session: cookie.id,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
      },
      deleteBook(i) {
        const book = this.books[i];
        const cookie = this.cookies.get("user");
        
        axios.post(this.APP_API_URL + 'deleteBook', {
          _id: book._id,
          username: this.user.username,
          session: cookie.id
        })
        .then((response) => {
          console.log(response);
          this.books.splice(this.books.indexOf(book), 1);
        })
        .catch((err) => {
          console.log(err);
        })
      },
      changeUsername() {
        let cookie = this.cookies.get("user");

        if(this.newUsername.length < 3) {
            this.alertType = "error";
            this.alertMessage = "username should be 3 characters or more";
            this.alert = true;
            return;
        }

        axios.post(this.APP_API_URL + 'editUsername', {
          session: cookie.id,
          username: cookie.username,
          newUsername: this.newUsername,
        })
        .then((response) => {
          if(response.data.error) {
            this.alertType = "error";
            this.alertMessage = response.data.message;
            this.alert = true;
          }
          else {
            this.alertType = "success";
            this.alertMessage = response.data.message;
            this.alert = true;

            this.cookies.set("user", {username: this.newUsername, id: cookie.id}, '1d');
          }
        })
        .catch((error) => {
          this.alertType = "error";
          this.alertMessage = "Request Error";
          this.alert = true;
          console.log(error);
        })
      },
      deleteUser() {
        const cookie = this.cookies.get("user");

        console.log("ran");

        axios.post(this.APP_API_URL + 'deleteUser', {
          username: cookie.username,
          session: cookie.id,
          password: this.password,
        })
        .then((response) => {
          if(response.data.error) {
            this.alertType = "error";
            this.alertMessage = response.data.message;
            this.alert = true;
          }
          else {
            this.alertType = "success";
            this.alertMessage = response.data.message;
            this.alert = true;

            this.$router.push({path: '/logout'});
          }
        })
        .catch((error) => {
            this.alertType = "error";
            this.alertMessage = "Request Error";
            this.alert = true;
            console.log(error);
        })
      },
      changePassword() {
        const cookie = this.cookies.get("user");

        axios.post(this.APP_API_URL + 'changePassword', {
          username: cookie.username,
          session: cookie.id,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        })
        .then((response) => {
          if(response.data.error) {
            this.alertType = "error";
            this.alertMessage = response.data.message;
            this.alert = true;
          }
          else {
            this.alertType = "success";
            this.alertMessage = response.data.message;
            this.alert = true;
          }
        })
        .catch((error) => {
          this.alertType = "error";
          this.alertMessage = "Request Error";
          this.alert = true;
          console.log(error);
        })
      }
    },
    mounted() {
      if(!this.cookies.get("user")) {
        this.$router.push({path: '/login'});
      }

      this.APP_API_URL = process.env.VUE_APP_LOCAL_API_URL;

      this.getBooks();
    }
  }
</script>

<template>
  <v-container class="mb-16">
    <p class="text-h4">Dashboard</p>

    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            dark
            v-bind="props"
          >
            Settings
          </v-btn>
        </template>
        <v-card>
          <v-toolbar
            dark
            color="primary"
          >
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
          </v-toolbar>
          <!-- <v-container> -->
            <v-list
              lines="two"
              subheader
            >
              <v-list-subheader>Edit User</v-list-subheader>
              <v-list-item>
                <v-list-item-title>Change username</v-list-item-title>
                <v-form>
                  <v-text-field
                    class="w-25"
                    v-model="this.newUsername"
                    label="New Username"
                    :rules="this.usernameRules"
                    required
                  ></v-text-field>
                  <v-btn class="mt-2 w-25" @click="this.changeUsername">Submit</v-btn>
                </v-form>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title>Delete User</v-list-item-title>
                <v-form>
                  <v-text-field
                    class="w-25"
                    v-model="this.password"
                    type="password"
                    label="password"
                    required
                  ></v-text-field>
                  <v-btn class="mt-2 w-25" color="error" @click="this.deleteUser"> 
                    Delete
                  </v-btn>
                </v-form>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Change Password</v-list-item-title>
                <v-form>
                  <v-text-field
                    class="w-25"
                    v-model="this.oldPassword"
                    type="password"
                    label="old password"
                    required
                  ></v-text-field>
                  <v-text-field
                    class="w-25"
                    v-model="this.newPassword"
                    type="password"
                    label="new password"
                    :rules="this.passwordRules"
                    required
                  ></v-text-field>
                  <v-btn class="mt-2 w-25" @click="this.changePassword">
                    Change Password
                  </v-btn>
                </v-form>
              </v-list-item>
              <v-alert
                    v-if="this.alert"
                    :type="this.alertType"
                    title="Alert"
                    :text="this.alertMessage"
                ></v-alert>
            </v-list>
          <!-- </v-container> -->
        </v-card>
      </v-dialog>
    </v-row>

    <div v-if="this.emptyBooks" class="text-center d-flex justify-center align-center text-h5 flex-column" style="min-height: 20vh;">
      <p class="text-subtitle-1 font-weight-light">You Have No Books!</p>
      <v-btn href="/search">Add Books</v-btn>
    </div>
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="(book, index) in this.books" :key="index">
        <BookComponent :title="book.title" :author="book.author" :cover="book.image" progress="true" :read="book.read" :pageCount="book.pageCount" :keyId="index"
          :deleteFunc="deleteBook"/>
      </v-col>
    </v-row>
  </v-container>
</template>