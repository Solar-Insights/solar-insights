<template>
    <v-app-bar class="mx-auto" elevation="0">
        <v-btn
            @click="emits('showMap')"
            class="navbar-btn"
            :class="showingMap ? 'text-theme' : ''"
            :ripple="false"
            :active="false"
            elevation="0"
        >
            <template v-slot:prepend>
                <v-avatar variant="tonal" density="comfortable" size="small" style="border-radius: 8px">
                    <v-icon>mdi-earth</v-icon>
                </v-avatar>
            </template>
        </v-btn>

        <v-btn
            @click="emits('showData')"
            class="navbar-btn"
            :class="showingData ? 'text-theme' : ''"
            :ripple="false"
            :active="false"
            elevation="0"
        >
            <template v-slot:prepend>
                <v-avatar variant="tonal" density="comfortable" size="small" style="border-radius: 8px">
                    <v-icon>mdi-pencil</v-icon>
                </v-avatar>
            </template>
        </v-btn>

        <v-btn
            @click="emits('showSolarInsights')"
            class="navbar-btn"
            :class="showingSolarInsights ? 'text-theme' : ''"
            :ripple="false"
            :active="false"
            elevation="0"
        >
            <template v-slot:prepend>
                <v-avatar variant="tonal" density="comfortable" size="small" style="border-radius: 8px">
                    <v-icon>mdi-flash-outline</v-icon>
                </v-avatar>
            </template>
        </v-btn>

        <v-btn
            @click="emits('showBuildingAttributes')"
            class="navbar-btn"
            :class="showingBuildingAttributes ? 'text-theme' : ''"
            :ripple="false"
            :active="false"
            elevation="0"
        >
            <template v-slot:prepend>
                <v-avatar variant="tonal" density="comfortable" size="small" style="border-radius: 8px">
                    <v-icon>mdi-home-outline</v-icon>
                </v-avatar>
            </template>
        </v-btn>
    </v-app-bar>
</template>

<script setup lang="ts">

const props = defineProps({
    showingMap: {
        type: Boolean,
        required: true
    },
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

const emits = defineEmits(["showMap", "showData", "showSolarInsights", "showBuildingAttributes"]);
</script>