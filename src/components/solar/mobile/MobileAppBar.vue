<template>
    <v-app-bar elevation="0" density="compact">
        <MapToolBar />
    </v-app-bar>

    <v-app-bar elevation="0" density="compact">
        
        <v-spacer/>
        
        <v-btn
            @click="emits('showData')"
            class="navbar-btn mx-2"
            :class="showingData ? 'text-theme' : ''"
            :ripple="false"
            :active="false"
            elevation="0"
            icon
        >
            <v-avatar variant="tonal" density="comfortable" style="border-radius: 8px">
                <v-icon>mdi-pencil</v-icon>
            </v-avatar>
        </v-btn>

        <v-spacer/>

        <v-btn
            @click="emits('showSolarInsights')"
            class="navbar-btn mx-2"
            :class="showingSolarInsights ? 'text-theme' : ''"
            :ripple="false"
            :active="false"
            elevation="0"
            icon
        >
            <v-avatar variant="tonal" density="comfortable" style="border-radius: 8px">
                <v-icon>mdi-flash-outline</v-icon>
            </v-avatar>
        </v-btn>

        <v-spacer/>

        <v-btn
            @click="emits('showBuildingAttributes')"
            class="navbar-btn mx-2"
            :class="showingBuildingAttributes ? 'text-theme' : ''"
            :ripple="false"
            :active="false"
            elevation="0"
            icon
        >
            <v-avatar variant="tonal" density="comfortable" style="border-radius: 8px">
                <v-icon>mdi-home-outline</v-icon>
            </v-avatar>
        </v-btn>

        <v-spacer/>
    </v-app-bar>
</template>

<script setup lang="ts">
import MapToolBar from "@/components/solar/MapToolBar.vue";

const props = defineProps({
    showingData: {
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
    }
});

const emits = defineEmits(["showData", "showSolarInsights", "showBuildingAttributes"]);
</script>
