<script>
</script>

<template>
    <v-app>
        <v-container class="d-flex justify-center align-center text-h5 flex-column" style="min-height: 70vh;">
            <div>
                <p class="text-h2">myBook</p>
            </div>
            <div class="pt-4">
                <p class="text-h5">Never lose your place.</p>
            </div>
            <div class="pt-4">
                <v-btn @click="this.$router.push({path: '/register'});">Get Started</v-btn>
            </div>
        </v-container>
    </v-app>
</template>

<style>

</style>