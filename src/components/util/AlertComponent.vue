<template>
    <div class="alert-component">
        <v-alert
            class="alert-component"
            :type="matchType()"
            :title="matchTitle()"
            :text="matchMessage()"
            closable
            close-label="Close"
            @click:close="displayAlert = false;"
        />
        <hr :color="matchColorToType()" :width="`${timerProgress}%`" style="height: 5px" />
    </div>
</template>

<script setup lang="ts">
// Vue
import { useUserSessionStore } from '@/stores/userSessionStore';
import { storeToRefs } from 'pinia';

const userSessionStore = useUserSessionStore();
const { displayAlert } = storeToRefs(userSessionStore);

const props = defineProps({
    type: {
        type: String,
        required: true,
        default: "",
    },
    title: {
        type: String,
        required: true,
        default: "",
    },
    message: {
        type: String,
        required: true,
        default: "",
    },
    timerProgress: {
        type: Number,
        required: true,
        default: 100,
    },
});

function matchType() {
    switch (props.type) {
        case "success": {
            return "success";
        }
        case "warning": {
            return "warning";
        }
        case "error": {
            return "error";
        }
        default: {
            return "warning";
        }
    }
}

function matchTitle() {
    switch (props.title) {
        case "": {
            return "Error encountered";
        }
        default: {
            return props.title;
        }
    }
}

function matchMessage() {
    switch (props.message) {
        case "": {
            return "Something has happened";
        }
        default: {
            return props.message;
        }
    }
}

// Pour choix des couleurs
// https://vuetifyjs.com/en/styles/colors/#material-colors
function matchColorToType() {
    switch (props.type) {
        case "success": {
            return "#A5D6A7";
        }
        case "warning": {
            return "#FFCC80";
        }
        case "error": {
            return "#EF9A9A";
        }
        default: {
            return "#FFCC80";
        }
    }
}
</script>
