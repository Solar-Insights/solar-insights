<template>
    <div class="alert-component">
        <v-alert
            class="alert-component"
            :type="matchType()"
            :title="matchTitle()"
            :text="matchMessage()"
            closable
            close-label="Close"
        >
        
        </v-alert>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    type: {
        type: String,
        required: true,
        default: ""
    },
    title: {
        type: String,
        required: true,
        default: ""
    },
    message: {
        type: String,
        required: true,
        default: ""
    }
});

function matchType() {
    switch(props.type) {
        case "success": {
            return "success";
        }
        case "warning": {
            return "warning";
        }
        case "error": {
            return "error"
        }
        default: {
            return "warning";
        }
    }
}

function matchTitle() {
    switch(props.title) {
        case "": {
            return "Error encountered";
        }
        default: {
            return props.title;
        }
    }
}

function matchMessage() {
    switch(props.message) {
        case "": {
            return "Something has happened";
        }
        default: {
            return props.message;
        }
    }
}
</script>