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
      searchTerms: "ayn rand"
    }
  },
  methods: {
    requestData() {

      let terms = this.searchTerms.split(' ').join('+');
      console.log(terms);

      axios.get(`https://openlibrary.org/search.json?q=${terms}`)
        .then((res) => {
          let books = res.data.docs;

          if(books.length > 10) {
            books.length = 10;
          }

          this.books = books;

          console.log(this.books)
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
  }
}
</script>

<template>
  <input type="text" :value="this.searchTerms" @input="event => this.searchTerms = event.target.value">
  <button @click="requestData()">search</button>
  <ul>
    <li v-for="(book, index) in books" :key="index">
      <BookComponent :title="book.title" :author="book.author_name[0]" :cover="book.cover_i"/>
    </li>
  </ul>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>