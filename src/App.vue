<template>
    <v-app>
        <v-main>
            <v-container class="app-container" fluid>
                <AlertComponent
                    v-if="displayAlert"
                    :type="alertValue.type"
                    :title="alertValue.title"
                    :message="alertValue.message"
                    :timer-progress="iteLeft"
                />
                <router-view :key="$route.fullPath" @alert="handleAlertLifeCycle"></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
// Vue
import { ref, reactive } from "vue";
// Components
import AlertComponent from "@/components/util/AlertComponent.vue";

type alertData = {
    type: string;
    title: string;
    message: string;
};
const displayAlert = ref(false);
const alertValue: alertData = reactive({
    type: "",
    title: "",
    message: "",
});

const iteLeft = ref(100.0);
let currentInterval: NodeJS.Timeout | undefined = undefined;

const handleAlertLifeCycle = (data: alertData) => {
    displayAlert.value = true;
    alertValue.type = data.type;
    alertValue.title = data.title;
    alertValue.message = data.message;

    // Resets number of ite, deletes interval if exists, runs interval.
    // Removes display and interval when over.
    iteLeft.value = 100;
    if (currentInterval != undefined) {
        clearInterval(currentInterval);
        currentInterval = undefined;
    }
    currentInterval = setInterval(() => {
        if (iteLeft.value == 0) {
            clearInterval(currentInterval);
            displayAlert.value = false;
            return;
        }
        iteLeft.value -= 0.25;
    }, 10);
};
</script>
