<script>
  import BookComponent from './BookComponent.vue';
  import axios from 'axios';

  export default {
    components: {
      BookComponent
    },
    data() {
      return {
        APP_API_URL: "",
        books: [],
      }
    },
    methods: {
      getBooks() {
        axios.get(this.APP_API_URL + 'readBookDoc')
          .then((response) => {
            this.books = response.data;
            console.log(response.data);
          })
      },
      editBook(i, progress) {
        let book = this.books[i];
        axios.post(this.APP_API_URL + 'editBook', {
          _id: book._id,
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
          _id: book._id
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
      this.APP_API_URL = process.env.VUE_APP_LOCAL_API_URL;

      this.getBooks();
    }
  }
</script>

<template>
  <v-container>
    <p class="text-h4">Dashboard</p>
    <ul>
      <li v-for="(book, index) in this.books" :key="index">
        <BookComponent :title="book.title" :author="book.author" :cover="book.image" progress="true" :read="book.read" :pageCount="book.pageCount" :keyId="index"
          :deleteFunc="deleteBook"/>
      </li>
    </ul>
  </v-container>
</template>