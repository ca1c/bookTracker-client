<script>
export default {
	props: ['title', 'author', 'cover', 'progress', 'read', 'pageCount', 'searching', 'keyId'],
	data() {
		return {
			edit: false,
			error: false,
			errorMessage: "Too Many Pages",
			newPagesRead: 0,
			readState: 0,
			pageCountState: 0,
			progressAmt: "",
			APP_API_URL: "",
		}
	},
	methods: {
		updateProgressAmt() {
			this.progressAmt = Math.floor((this.readState / this.pageCountState) * 100).toString();
		},
		toggleEdit() {
			this.edit = this.edit ? false : true;
		},
		addRead() {
			if(parseInt(this.newPagesRead) + this.readState <= this.pageCountState) {
				this.error = false;
				this.readState = (this.readState + parseInt(this.newPagesRead));
				this.updateProgressAmt();
				this.$emit('editBook', this.keyId, this.readState);
			}
			else {
				this.error = true;
				this.errorMessage = "Too Many Pages";
			}
		},
		subtractRead() {
			if(this.readState - parseInt(this.newPagesRead) >= 0) {
				this.error = false;
				this.readState = (this.readState - parseInt(this.newPagesRead));
				this.updateProgressAmt();
				this.$emit('editBook', this.keyId, this.readState);
			}
			else {
				this.error = true;
				this.errorMessage = "Subtracting too many pages";
			}
		},
		finishBook() {
			let pagesLeft = this.pageCountState - this.readState;
			this.readState = this.readState + pagesLeft;
			this.updateProgressAmt();
			this.$emit('editBook', this.keyId, this.readState);
		},
		addBook() {
			this.$emit('addBook', this.keyId);
		},
		deleteBook() {
			this.$emit('deleteBook', this.keyId);
		}
	},
	mounted() {
		this.APP_API_URL = process.env.VUE_APP_LOCAL_API_URL
		this.readState = parseInt(this.read);
		this.pageCountState = parseInt(this.pageCount);
		this.updateProgressAmt();
	}
}
</script>

<template>
	<v-container>
		<v-card elevation="3">
		<div class="book">
			<v-avatar
                class="ma-3"
                size="200"
                rounded="0"
              >
                <v-img :src="this.cover"></v-img>
            </v-avatar>
			<v-card-title>{{ this.title }}</v-card-title>
			<v-card-subtitle>{{ this.author }}</v-card-subtitle>
			<div v-if="this.progress" class="progress">
				<v-card-text>
					<v-progress-linear
						v-model="this.progressAmt"
						height="25"
						color="secondary"
					>
						<template v-slot:default="{ value }">
							<strong>{{ Math.ceil(value) }}%</strong>
						</template>
					</v-progress-linear>
					<!-- <div class="progressFg" :style="{ width: this.progressAmt }"></div> -->
					<!-- <div class="progressBg"></div> -->
					<div class="progressString">Pages Read: {{ this.readState }} / {{ this.pageCountState }}</div>
				</v-card-text>
				<v-card-actions>
					<v-btn elevation="3" color="secondary" @click="this.toggleEdit">Edit</v-btn>
					<v-btn elevation="3" color="#E4E6C3" @click="this.finishBook">Finish</v-btn>
					<v-btn elevation="3" color="#E4E6C3" @click="this.deleteBook">Delete</v-btn>
				</v-card-actions>
				<!-- <button @click="this.toggleEdit">Edit</button>
				<button @click="this.finishBook">Finish</button>
				<button @click="this.deleteBook">Delete</button> -->
				<v-expand-transition>
					<div class="edit" v-if="this.edit">
						<v-card-text>
							<p class="text-h6">Add Pages Read:</p>
							<!-- <p v-if="this.error" :style="{ color: 'red' }">Too Many Pages!</p> -->
							<v-fade-transition>
								<v-alert
									v-if="this.error"
									type="error"
									:text="this.errorMessage"
								></v-alert>
							</v-fade-transition>
							<!-- <input type="number" :value="this.newPagesRead" @input="event => this.newPagesRead = event.target.value">
							<button @click="this.editRead">submit</button> -->
							<v-row>
								<v-col
								cols="12"
								md="6"
								>
									<v-text-field
										v-model="newPagesRead"
										type="number"
										label="pages"
									></v-text-field>
								</v-col>

								<v-col
								cols="12"
								md="6"
								>
									<v-btn class="mt-2" @click="this.addRead">Add</v-btn>
									<v-btn class="mt-2" @click="this.subtractRead">Subtract</v-btn>
								</v-col>
							</v-row>
						</v-card-text>
					</div>
				</v-expand-transition>
			</div>
			<div v-if="this.searching">
				<v-card-actions>
					<v-btn block color="primary" elevation="3" @click="this.addBook">Add</v-btn>
				</v-card-actions>
			</div>

		</div>
		</v-card>
	</v-container>
</template>

<style>
.book {
	padding: 10px;
	/* border: 1px solid black; */
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