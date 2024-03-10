<template>
    <v-slider
        v-if="mapSettings.layerId === 'monthlyFlux'"
        v-model="timeParams.month"
        @start="emits('currentlySliding')"
        @end="
            emits('notCurrentlySliding')
            timeParams.tick = timeParams.month;
        "
        :min="0"
        :max="11"
        step="1"
        hide-details
        color="theme"
        :class="$vuetify.display.xs ? 'time-slider-mobile' : 'time-slider-computer'"
        rounded
    >
        <template v-slot:append>
            <div class="ml-1" style="width: 50px">
                {{ monthCodes[timeParams.month] }}
            </div>
        </template>
    </v-slider>

    <v-slider
        v-if="mapSettings.layerId === 'hourlyShade'"
        v-model="timeParams.hour"
        @start="emits('currentlySliding')"
        @end="
            emits('notCurrentlySliding')
            timeParams.tick = timeParams.hour;
        "
        :min="0"
        :max="23"
        step="1"
        hide-details
        color="theme"
        :class="$vuetify.display.xs ? 'time-slider-mobile' : 'time-slider-computer'"
    >
        <template v-slot:append>
            <div class="ml-1" style="width: 50px">
                {{ hourCodes[timeParams.hour] }}
            </div>
        </template>
    </v-slider>
</template>

<script setup lang="ts">
// Vue
import { PropType, onMounted, ref, watch } from "vue";
// Helpers
import { Layer, MapSettings } from "geo-env-typing/solar";
import { TimeParameters } from "@/helpers/types";
import { monthCodes, hourCodes } from "@/helpers/constants";
import { makeDefaultMapSettings, makeDefaultTimeParams } from "@/helpers/solar";

const emits = defineEmits(["updateTimeParams", "displayMonthlyFlux", "displayHourlyShade", "currentlySliding", "notCurrentlySliding"]);

const props = defineProps({
    layer: {
        type: Object as PropType<Layer>,
        default: undefined
    },
    mapSettings: {
        type: Object as PropType<MapSettings>,
        required: true,
        default: makeDefaultMapSettings()
    },
    currentlySliding: {
        type: Boolean,
        require: true,
        default: false,
    }
});

const timeParams = ref<TimeParameters>(makeDefaultTimeParams());

onMounted(async () => {
    setInterval(() => {
        handleTickChange();
    }, 1000);
});

function handleTickChange() {
    if (props.mapSettings.heatmapAnimation) {
        timeParams.value.tick++;
    }

    if (
        props.layer?.id === "monthlyFlux" &&
        props.mapSettings.heatmapAnimation &&
        props.mapSettings.showHeatmap &&
        !props.currentlySliding
    ) {
        timeParams.value.month = (timeParams.value.month + 1) % 12;
    } else if (
        props.layer?.id === "hourlyShade" &&
        props.mapSettings.heatmapAnimation &&
        props.mapSettings.showHeatmap &&
        !props.currentlySliding
    ) {
        timeParams.value.hour = (timeParams.value.hour + 1) % 24;
    }

    emits("updateTimeParams", timeParams.value.tick, timeParams.value.month, timeParams.value.day, timeParams.value.hour)
}

watch(
    () => timeParams.value.tick,
    () => {
        if (props.layer?.id === "monthlyFlux" && props.mapSettings.showHeatmap) {
            emits("displayMonthlyFlux");
        } else if (props.mapSettings.layerId === "hourlyShade" && props.mapSettings.showHeatmap) {
            emits("displayHourlyShade");
        }
    }
);
</script>