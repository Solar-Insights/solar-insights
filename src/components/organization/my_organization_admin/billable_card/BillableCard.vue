<template>
    <v-col cols="12" xs="12" sm="6" md="6">
        <v-card class="billable-card" border max-width="600">
            <v-card-text class="billable-card-container">
                <div class="billable-card-title"> {{ title }} </div>

                <slot></slot>
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true,
    }
});

</script>