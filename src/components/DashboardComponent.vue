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
          })
      }
    },
    mounted() {
      this.APP_API_URL = process.env.VUE_APP_LOCAL_API_URL;

      this.getBooks();
    }
  }
</script>

<template>
  <h1>Dashboard</h1>
  <ul>
    <li v-for="(book, index) in this.books" :key="index">
      <BookComponent :title="book.title" :author="book.author" :cover="book.image" progress="true" :read="book.read" :pageCount="book.pageCount"/>
    </li>
  </ul>
</template>