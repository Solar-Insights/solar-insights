<template>
    <v-app>
        <v-main>
            <v-container class="app-container" fluid>
                <AlertComponent
                    v-if="displayAlert"
                    :type="alert.type"
                    :title="alert.title"
                    :message="alert.message"
                    :timer-progress="iteLeftPercentage"
                />
                <router-view :key="$route.fullPath"></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
// Vue
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUserSessionStore } from "./stores/userSessionStore";
// Components
import AlertComponent from "@/components/util/AlertComponent.vue";

const userSessionStore = useUserSessionStore();
const { displayAlert, alert } = storeToRefs(userSessionStore); 

const iteLeftPercentage = ref(100);
let interval: NodeJS.Timeout | undefined = undefined;

watch(displayAlert, () => {
    resetIteProgression();
    resetNodeInterval();
    
    if (displayAlert.value) {
        initNodeInterval();
    }
})

watch(alert.value, () => {
    resetIteProgression();
});

function resetIteProgression() {
    iteLeftPercentage.value = 100;
}

function resetNodeInterval() {
    if (interval) {
        clearInterval(interval);
        interval = undefined;
    }
}

function initNodeInterval() {
    interval = setInterval(() => {
        if (iteLeftPercentage.value <= 0) {
            displayAlert.value = false;
            resetNodeInterval();
        } else {
            iteLeftPercentage.value -= 0.20;
        }
    }, 10);
}
</script>
