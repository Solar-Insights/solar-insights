<template>
    <div class="alert-component" v-if="displayAlert">
        <v-alert
            class="alert-component"
            :type="matchType(alert.type)"
            :title="matchTitle(alert.title)"
            :text="matchMessage(alert.message)"
            closable
            close-label="Close"
            @click:close="displayAlert = false"
        />
        <hr
            :width="`${iteLeftPercentage}%`"
            style="height: 5px"
            :style="`color: ${matchColorToType(alert.type)}; background-color: ${matchColorToType(alert.type)};`"
        />
    </div>
</template>

<script setup lang="ts">
// Vue
import { useUserSessionStore } from "@/stores/userSessionStore";
import { storeToRefs } from "pinia";
import { watch, ref } from "vue";
// Helpers
import { matchType, matchTitle, matchMessage, matchColorToType } from "@/helpers/customErrors";

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
});

watch(alert, () => {
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
            iteLeftPercentage.value -= 0.2;
        }
    }, 10);
}
</script>
