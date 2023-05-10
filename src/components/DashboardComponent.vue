<script>
  import BookComponent from './BookComponent.vue';
  import axios from 'axios';
  import { useCookies } from "vue3-cookies";

  export default {
    setup() {
        const { cookies } = useCookies();
        return { cookies };
    },
    components: {
      BookComponent
    },
    data() {
      return {
        APP_API_URL: "",
        books: [],
        rows: 0,
        emptyBooks: null,
        user: this.cookies.get("user") || undefined
      }
    },
    methods: {
      getBooks() {
        if(this.user) {
          axios.get(`${this.APP_API_URL}readBookDoc?username=${this.user.username}`)
            .then((response) => {
              this.books = response.data;
              this.emptyBooks = this.books.length === 0;
              this.rows = Math.ceil((this.books.length + 1) / 3);
            })
        }
      },
      editBook(i, progress) {
        let book = this.books[i];
        axios.post(this.APP_API_URL + 'editBook', {
          _id: book._id,
          username: this.user.username,
          progress: progress.toString(),
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
      },
      deleteBook(i) {
        let book = this.books[i];
        
        axios.post(this.APP_API_URL + 'deleteBook', {
          _id: book._id,
          username: this.user.username
        })
        .then((response) => {
          console.log(response);
          this.books.splice(this.books.indexOf(book), 1);
        })
        .catch((err) => {
          console.log(err);
        })
      },
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