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
    },
    addBook(i) {
      let book = this.books[i];
      axios.post(this.APP_API_URL + 'addBook', {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        image: book.volumeInfo.imageLinks.thumbnail,
        pageCount: book.volumeInfo.pageCount,
        read: "0"
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
    },
  },
  mounted() {
    this.APP_API_URL = process.env.VUE_APP_LOCAL_API_URL;
  }
}
</script>

<template>
  <v-container>
    <p class="text-h4">Search</p>
    <v-sheet width="500" class="mx-auto">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="searchTerms"
              label="search"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-btn block class="mt-2" @click="requestData()">Submit</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    </v-sheet>
    <!-- <input type="text" :value="this.searchTerms" @input="event => this.searchTerms = event.target.value">
    <button @click="requestData()">search</button> -->
    <ul>
      <li v-for="(book, index) in books" :key="index">
        <BookComponent 
          :title="book.volumeInfo.title" 
          :author="getValue(book.volumeInfo, 'authors[0]')" 
          :cover="getValue(book.volumeInfo, 'imageLinks.thumbnail')" 
          :pageCount="getValue(book.volumeInfo, 'pageCount')" 
          :searching="true"
          :keyId="index"
        />
      </li>
    </ul>
  </v-container>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>