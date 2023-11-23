<template>
  <v-app>
    <v-main>
      <AlertComponent type="" title="" message="" v-if="!displayAlert"/>
      <v-container class="h-100 pa-0" fluid style="position: relative">
        <router-view :key="$route.fullPath"></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';
// Components
import AlertComponent from '@/components/misc/AlertComponent.vue';

const displayAlert = ref(false);
</script>