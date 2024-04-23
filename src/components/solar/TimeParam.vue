<template>
    <v-slider
        v-if="mapSettings.layerId === 'monthlyFlux'"
        v-model="timeParams.month"
        @start="currentlySliding = true"
        @end="
            currentlySliding = false;
            timeParams.tick = timeParams.month;
            handleTickUpdate();
        "
        :min="0"
        :max="11"
        step="1"
        hide-details
        color="theme"
        :class="$vuetify.display.smAndDown ? 'time-slider-mobile' : 'time-slider-computer'"
        rounded
    >
        <template v-slot:append>
            <div class="ml-1" style="width: 50px">
                {{ $t(`general.month-codes.${monthCodes[timeParams.month]}`) }}
            </div>
        </template>
    </v-slider>

    <v-slider
        v-if="mapSettings.layerId === 'hourlyShade'"
        v-model="timeParams.hour"
        @start="currentlySliding = true"
        @end="
            currentlySliding = false;
            timeParams.tick = timeParams.hour;
            handleTickUpdate();
        "
        :min="0"
        :max="23"
        step="1"
        hide-details
        color="theme"
        :class="$vuetify.display.smAndDown ? 'time-slider-mobile' : 'time-slider-computer'"
    >
        <template v-slot:append>
            <div class="ml-1" style="width: 50px">
                {{ hourCodes[timeParams.hour] }}
            </div>
        </template>
    </v-slider>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useSolarMapStore } from "@/stores/solarMapStore";
import { storeToRefs } from "pinia";
import { monthCodes, hourCodes } from "@/helpers/constants";

const solarMapStore = useSolarMapStore();

const { mapSettings, timeParams, layer } = storeToRefs(solarMapStore);

const currentlySliding = ref(false);
let intervalId: NodeJS.Timeout;

onMounted(async () => {
    intervalId = setInterval(() => {
        handleIntervalChange();
    }, 1000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});

function handleIntervalChange() {
    if (mapSettings.value.heatmapAnimation) {
        timeParams.value.tick++;
        handleTickUpdate();
    }

    if (
        layer.value?.id === "monthlyFlux" &&
        mapSettings.value.heatmapAnimation &&
        mapSettings.value.showHeatmap &&
        !currentlySliding.value
    ) {
        timeParams.value.month = (timeParams.value.month + 1) % 12;
    } else if (
        layer.value?.id === "hourlyShade" &&
        mapSettings.value.heatmapAnimation &&
        mapSettings.value.showHeatmap &&
        !currentlySliding.value
    ) {
        timeParams.value.hour = (timeParams.value.hour + 1) % 24;
    }
}

function handleTickUpdate() {
    if (layer.value?.id === "monthlyFlux" && mapSettings.value.showHeatmap) {
        solarMapStore.displayMonthlyFlux();
    } else if (mapSettings.value.layerId === "hourlyShade" && mapSettings.value.showHeatmap) {
        solarMapStore.displayHourlyShade();
    }
}
</script>
