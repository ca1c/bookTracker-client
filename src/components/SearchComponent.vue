<script>
import axios from 'axios';
import BookComponent from './BookComponent.vue';

export default {
  components: {
    BookComponent
  },
  data() {
    return {
      books: [],
      searchTerms: "ayn rand",
      API_KEY: "",
      API_URL: ""
    }
  },
  methods: {
    requestData() {

      let terms = this.searchTerms.split(' ').join('+');
      let query = `${this.API_URL}${terms}${this.API_KEY}`;

      axios.get(query)
        .then((res) => {
          let books = res.data.items;

          if(books.length > 10) {
            books.length = 10;
          }

          this.books = books;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log("request attempted");
        })
    }
  },
  mounted() {
    this.API_KEY = "&key=" + process.env.VUE_APP_API_KEY;
    this.API_URL = process.env.VUE_APP_API_URL;
  }
}
</script>

<template>
  <input type="text" :value="this.searchTerms" @input="event => this.searchTerms = event.target.value">
  <button @click="requestData()">search</button>
  <ul>
    <li v-for="(book, index) in books" :key="index">
      <BookComponent :title="book.volumeInfo.title" :author="book.volumeInfo.authors[0]" :cover="book.volumeInfo.imageLinks.thumbnail"/>
    </li>
  </ul>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>