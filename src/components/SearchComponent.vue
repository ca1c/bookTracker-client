<script>
import axios from 'axios';
import BookComponent from './BookComponent.vue';
import _ from 'lodash';
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
      books: [],
      pages: [],
      pageSize: 9,
      page: 1,
      searchTerms: "",
      API_KEY: "",
      API_URL: "",
      snackbar: false,
      timeout: 2000,
      loading: false,
    }
  },
  methods: {
    makePages() {
      let pages = [];
      for(let i = 0; i < this.books.length; i+=this.pageSize) {
        pages.push(this.books.slice(i, i + this.pageSize));
      }

      this.pages = pages;
    },
    requestData() {

      let terms = this.searchTerms.split(' ').join('+');
      let query = `${this.APP_API_URL}searchBook?q=${terms}`;

      this.loading = true;

      axios.get(query)
        .then((res) => {
          this.loading = false;
          let books = res.data.items;

          this.books = books.filter(book => typeof book.volumeInfo.pageCount !== 'undefined');

          this.makePages();
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
      let user = this.cookies.get("user");
      let book = this.books[i];
      if(user.username) {
        axios.post(this.APP_API_URL + 'addBook', {
          username: user.username,
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors[0],
          image: book.volumeInfo.imageLinks.thumbnail,
          pageCount: book.volumeInfo.pageCount,
          read: "0",
          session: user.id,
        })
        .then((response) => {
          console.log(response);
          this.showAlert("Book Added!");
        })
        .catch((err) => {
          console.log(err);
        })
      }
    },
    showAlert() {
      this.snackbar = true;
    }
  },
  mounted() {
    if(!this.cookies.get("user")) {
      this.$router.push({path: '/login'});
    }

    this.APP_API_URL = process.env.VUE_APP_LOCAL_API_URL;
  }
}
</script>

<template>
  <v-container class="mb-16">
    <p class="text-h4">Search</p>
    <v-sheet max-width="500" class="mx-auto">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="searchTerms"
              label="search authors and books"
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
    <v-pagination v-model="page" :length="this.pages.length"></v-pagination>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      Book Added To Your Library.

      <template v-slot:actions>
        <v-btn
          color="secondary"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <div class="d-flex justify-center">
      <v-progress-circular v-if="this.loading"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="(book, index) in this.pages[this.page - 1]" :key="index">
        <BookComponent 
          :title="book.volumeInfo.title" 
          :author="getValue(book.volumeInfo, 'authors[0]')" 
          :cover="getValue(book.volumeInfo, 'imageLinks.thumbnail')" 
          :pageCount="getValue(book.volumeInfo, 'pageCount')" 
          :searching="true"
          :keyId="index"
          @addBook="this.addBook"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>