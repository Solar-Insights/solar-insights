<template>
    <v-bottom-navigation v-model="navigationIndex" color="theme" mandatory>
        <v-btn @click="emits('showData')" class="no-btn-hover-bg">
            <v-icon>mdi-pencil</v-icon>
            <span> Edit </span>
        </v-btn>

        <v-btn @click="emits('showMap')" class="no-btn-hover-bg">
            <v-icon>mdi-earth</v-icon>
            <span> Map </span>
        </v-btn>

        <v-btn @click="emits('showSolarInsights')" class="no-btn-hover-bg">
            <v-icon>mdi-flash-outline</v-icon>
            <span> Insights </span>
        </v-btn>

        <v-btn @click="emits('showBuildingAttributes')" class="no-btn-hover-bg">
            <v-icon>mdi-home-outline</v-icon>
            <span> Building </span>
        </v-btn>
    </v-bottom-navigation>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    showingData: {
        type: Boolean,
        required: true
    },
    showingMap: {
        type: Boolean,
        required: true
    },
    showingSolarInsights: {
        type: Boolean,
        required: true
    },
    showingBuildingAttributes: {
        type: Boolean,
        required: true
    },
});

const emits = defineEmits(["showData",  "showMap", "showSolarInsights", "showBuildingAttributes"]);

const navigationIndex = ref(mapNavigationIndexToSolarInsights());

function mapNavigationIndexToSolarInsights() {
    if (props.showingData) return 0;
    else if (props.showingMap) return 1;
    else if (props.showingSolarInsights) return 2;
    else if (props.showingBuildingAttributes) return 3;
}
</script>
