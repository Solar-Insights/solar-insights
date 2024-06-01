<template>  
    <v-snackbar 
        v-if="alert !== undefined"
        v-model="snackbar"
        :class="theme === 'dark' ? 'dark-toast-container' : 'light-toast-container'"
        max-width="350"
        location="top right" 
        variant="elevated"
        timeout="3000"
        :multi-line="true"
        :timer="alert.type"
    >
        <v-alert
            :class="theme === 'dark' ? 'dark-toast-content' : 'light-toast-content'"
            class="pa-0"
            closable
            close-label="Close"
            @click:close="userSessionStore.removeAlert()"
        >   
            <template v-slot:prepend>
                <v-icon 
                    size="x-large" 
                    :color="matchType(alert.type)"
                >
                    {{ matchIconToAlertType(matchType(alert.type)) }}
                </v-icon>
            </template>

            <v-alert-title :class="`text-${matchType(alert.type)}`">
                {{ matchTitle(alert.title) }}
            </v-alert-title>

            <div class="my-2">
                {{ matchMessage(alert.message) }}
            </div>
        </v-alert>
    </v-snackbar>
</template>

<script setup lang="ts">
import { useUserSessionStore } from "@/stores/userSessionStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { matchType, matchTitle, matchMessage } from "@/helpers/customErrors";
import { AlertType } from "@/helpers/types";

const userSessionStore = useUserSessionStore();

const { theme, alert } = storeToRefs(userSessionStore);

const snackbar = ref(true);

function matchIconToAlertType(alertType: AlertType) {
    switch (alertType) {
        case "success":
            return "mdi-checkbox-marked-circle-outline";
        case "warning":
            return "mdi-alert-circle-outline";
        case "error":
            return "mdi-close-circle-outline";
    }
}
</script>
