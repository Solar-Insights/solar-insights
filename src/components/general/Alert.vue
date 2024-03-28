<template>
    <div class="alert-component" v-if="alert !== undefined" style="position: absolute;">
        <v-alert
            class="alert-component"
            :type="matchType(alert.type)"
            :title="matchTitle(alert.title)"
            :text="matchMessage(alert.message)"
            closable
            close-label="Close"
            @click:close="userSessionStore.removeAlert()"
            rounded="0"
        />
        <hr
            :width="`${alertDisplayPercentage}%`"
            style="height: 5px"
            :style="`color: ${matchColorToType(alert.type)}; background-color: ${matchColorToType(alert.type)};`"
        />
    </div>
</template>

<script setup lang="ts">
// Vue
import { useUserSessionStore } from "@/stores/userSessionStore";
import { storeToRefs } from "pinia";
import { watch, ref, onMounted } from "vue";
// Helpers
import { matchType, matchTitle, matchMessage, matchColorToType } from "@/helpers/customErrors";

const userSessionStore = useUserSessionStore();

const MAX_DISPLAY_PERCENTAGE = 100;
const MS_BETWEEN_TICKS = 10;
const DECREMENT_PERCENTAGE = 0.3;

const { alert } = storeToRefs(userSessionStore);
const alertDisplayPercentage = ref(MAX_DISPLAY_PERCENTAGE);

watch(alert, () => {
    resetAlertDisplay();
});


onMounted(async () => {
    setInterval(() => {
        handleIntervalChange();
    }, MS_BETWEEN_TICKS);
});

function handleIntervalChange() {
    if (alert.value === undefined) {
        resetAlertDisplay();
        return;
    }

    decrementAlertDisplay();
    if (alertDisplayPercentage.value <= 0) {
        userSessionStore.removeAlert();
    }
}

function resetAlertDisplay() {
    alertDisplayPercentage.value = MAX_DISPLAY_PERCENTAGE;
}

function decrementAlertDisplay() {
    alertDisplayPercentage.value -= DECREMENT_PERCENTAGE;
}
</script>
