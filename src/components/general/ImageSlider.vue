<template>
    <v-carousel class="home-carousel" :continuous="true" :cycle="true" hide-delimiters>
        <v-carousel-item
            v-for="i in 15"
            class="home-carousel-img"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            cover
        ></v-carousel-item>
  </v-carousel>
</template>

<script setup lang="ts">
</script>