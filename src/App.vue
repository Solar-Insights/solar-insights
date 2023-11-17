<template>
  <v-app>
    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">

</script>