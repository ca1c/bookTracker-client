<script>
export default {
	props: ['title', 'author', 'cover'],
}
</script>

<template>
	<div class="book">
		<img :src="this.cover">
		<h5>{{ this.title }}</h5>
		<em>{{ this.author }}</em>
	</div>
</template>

<style>
.book {
	padding: 10px;
	border: 1px solid black;
}
</style>