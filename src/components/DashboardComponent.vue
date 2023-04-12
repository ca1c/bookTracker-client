<script>
  import BookComponent from './BookComponent.vue';

  export default {
    components: {
      BookComponent
    },
    data() {
      return {
        books: [
          {
            title: "The Fountainhead",
            author: "Ayn Rand",
            image: "http://books.google.com/books/content?id=qcDM4-3R168C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            pageCount: 752,
            read: 137,
          },
          {
            title: "Anthem",
            author: "Ayn Rand",
            image: "http://books.google.com/books/content?id=KbGNEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            pageCount: 260,
            read: 102
          }
        ],
      }
    }
  }
</script>

<template>
  <h1>Dashboard</h1>
  <ul>
    <li v-for="(book, index) in this.books" :key="index">
      <BookComponent :title="book.title" :author="book.author" :cover="book.image" progress="true" :progressAmt="Math.floor((book.read / book.pageCount) * 150).toString() + 'px'" :read="book.read" :pageCount="book.pageCount"/>
    </li>
  </ul>
</template>