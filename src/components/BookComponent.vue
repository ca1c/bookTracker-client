<script>
export default {
	props: ['title', 'author', 'cover', 'progress', 'progressAmt', 'read', 'pageCount'],
	mounted() {
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
			<div class="progressString">Pages Read: {{ this.read }} / {{ this.pageCount }}</div>
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