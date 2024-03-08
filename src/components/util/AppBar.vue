<template>
    <v-toolbar-items class="pl-8" style="height: 50px;">
        <v-app-bar-nav-icon 
            class="hidden-sm-and-up" 
            variant="text" 
            @click.stop="drawer = !drawer"
        />

        <v-btn 
            class="hidden-xs"
            v-for="route in routes"
            :to="{ name: route.routeName }"
        >
            {{ route.displayedName }}
        </v-btn>
    </v-toolbar-items>

    <v-navigation-drawer v-model="drawer" class="hidden-sm-and-up" disable-resize-watcher>
        <v-list>
            <v-list-item 
                v-for="route in routes"
                :to="{ name: route.routeName }"
                :prepend-icon="route.icon"
            >
                {{ route.displayedName }}
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
  
<script setup lang="ts">
// Vue
import { ref } from 'vue';

const drawer = ref(false);

const routes = ref([
    {
        routeName: "home",
        displayedName: "Home",
        icon: "mdi-home"
    },    
    {
        routeName: "solar-map",
        displayedName: "Solar",
        icon: "mdi-weather-sunny"
    },
    {
        routeName: "air-quality-map",
        displayedName: "Air Quality",
        icon: "mdi-weather-windy"
    }
]);

</script>
