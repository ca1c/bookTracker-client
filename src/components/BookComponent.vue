<script>
export default {
	props: ['title', 'author', 'cover', 'progress', 'read', 'pageCount'],
	data() {
		return {
			edit: false,
			error: false,
			newPagesRead: "",
			readState: "",
			pageCountState: "",
			progressAmt: "",
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
			if(parseInt(this.newPagesRead) + parseInt(this.readState) <= parseInt(this.pageCountState)) {
				this.error = false;
				this.readState = (parseInt(this.readState) + parseInt(this.newPagesRead)).toString();
				this.updateProgressAmt();
			}
			else {
				this.error = true;
			}
		},
		finishBook() {
			let pagesLeft = parseInt(this.pageCountState) - parseInt(this.readState);
			this.readState = parseInt(this.readState) + pagesLeft;
			this.updateProgressAmt();
		}
	},
	mounted() {
		this.readState = this.read;
		this.pageCountState = this.pageCount;
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
			<div class="edit" v-if="this.edit">
				<p>Add Pages Read:</p>
				<p v-if="this.error" :style="{ color: 'red' }">Too Many Pages!</p>
				<input type="text" :value="this.newPagesRead" @input="event => this.newPagesRead = event.target.value">
				<button @click="this.editRead">submit</button>
			</div>
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