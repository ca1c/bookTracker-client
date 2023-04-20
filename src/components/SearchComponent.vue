<script>
import axios from 'axios';
import BookComponent from './BookComponent.vue';
import _ from 'lodash';

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
      let query = `http://localhost:3000/searchBook?q=${terms}`;

      axios.get(query)
        .then((res) => {
          let books = res.data.items;

          if(books.length > 10) {
            books.length = 10;
          }

          this.books = books.filter(book => typeof book.volumeInfo.pageCount !== 'undefined');

          console.log(this.books)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log("request attempted");
        })
    },
    getValue(object, string, defaultValue = '') {
      return _.get(object, string, defaultValue);
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
      <BookComponent 
        :title="book.volumeInfo.title" 
        :author="getValue(book.volumeInfo, 'authors[0]')" 
        :cover="getValue(book.volumeInfo, 'imageLinks.thumbnail')" 
        :pageCount="getValue(book.volumeInfo, 'pageCount')" 
        :searching="true"
      />
    </li>
  </ul>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>