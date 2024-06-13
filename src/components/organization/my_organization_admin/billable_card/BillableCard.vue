<template>
    <v-card class="billable-card" max-width="500" border>
        <v-card-text class="billable-card-container">
            <div class="billable-card-title"> {{ title }} </div>

            <slot></slot>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true,
    }
});

</script>