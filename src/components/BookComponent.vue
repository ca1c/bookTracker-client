<script>
import axios from 'axios';

export default {
	props: ['title', 'author', 'cover', 'progress', 'read', 'pageCount', 'searching', 'keyId', 'deleteFunc'],
	data() {
		return {
			edit: false,
			error: false,
			newPagesRead: 0,
			readState: 0,
			pageCountState: 0,
			progressAmt: "",
			APP_API_URL: "",
		}
	},
	methods: {
		updateProgressAmt() {
			this.progressAmt = Math.floor((this.readState / this.pageCountState) * 150).toString() + 'px';
		},
		toggleEdit() {
			this.edit = this.edit ? false : true;
		},
		editRead() {
			if(parseInt(this.newPagesRead) + this.readState <= this.pageCountState) {
				this.error = false;
				this.readState = (this.readState + parseInt(this.newPagesRead));
				this.updateProgressAmt();
			}
			else {
				this.error = true;
			}
		},
		finishBook() {
			let pagesLeft = this.pageCountState - this.readState;
			this.readState = this.readState + pagesLeft;
			this.updateProgressAmt();
		},
		addBook() {
			axios.post(this.APP_API_URL + 'addBook', {
				title: this.title,
				author: this.author,
				image: this.cover,
				pageCount: this.pageCount,
				read: "0"
			})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			})
		},
		deleteBook() {
			axios.post(this.APP_API_URL + 'deleteBook', {
				title: this.title
			})
			.then((response) => {
				console.log(response);
				this.$parent.deleteBook(this.keyId);
			})
			.catch((err) => {
				console.log(err);
			})
		}
	},
	mounted() {
		this.APP_API_URL = process.env.VUE_APP_LOCAL_API_URL
		this.readState = parseInt(this.read);
		this.pageCountState = parseInt(this.pageCount);
		this.updateProgressAmt();
		console.log(this.progressAmt);
	}
}
</script>

<template>
	<div class="book">
		<img :src="this.cover">
		<h5>{{ this.title }}</h5>
		<em>{{ this.author }}</em>
		<div v-if="this.progress" class="progress">
			<div class="progressFg" :style="{ width: this.progressAmt }"></div>
			<div class="progressBg"></div>
			<div class="progressString">Pages Read: {{ this.readState }} / {{ this.pageCountState }}</div>
			<button @click="this.toggleEdit">Edit</button>
			<button @click="this.finishBook">Finish</button>
			<button @click="this.deleteBook">Delete</button>
			<div class="edit" v-if="this.edit">
				<p>Add Pages Read:</p>
				<p v-if="this.error" :style="{ color: 'red' }">Too Many Pages!</p>
				<input type="number" :value="this.newPagesRead" @input="event => this.newPagesRead = event.target.value">
				<button @click="this.editRead">submit</button>
			</div>
		</div>
		<div v-if="this.searching">
			<button @click="this.addBook">Add</button>
		</div>
	</div>
</template>

<style>
.book {
	padding: 10px;
	border: 1px solid black;
}
.progress {
	position: relative;
}
.progressBg {
	border-radius: 5px;
	width: 150px;
	height: 10px;
	background-color: #b9c2c7;
}
.progressFg {
	position: absolute;
	top: 0;
	left: 0;
	background-color: #34aeeb;
	border-radius: 10px;
	height: 10px;
	width:27px;
}
</style>