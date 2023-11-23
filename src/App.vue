<template>
  <v-app>
    <v-main>
      <ErrorComponent v-if="displayError"/>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';
// Components
import ErrorComponent from '@/components/util/ErrorComponent.vue';

const displayError = ref(false);
</script>