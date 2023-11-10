<template>
    <template v-for="(pollutant, i) in pollutants" :key="i">
        <v-hover v-slot="{ isHovering, props }">
            <v-card v-bind="props" class="ma-3 pa-2 rounded-lg" variant="text" :style="isHovering ? 'color: black; border: 2px solid #4C8BF5;' : 'color: #949494; border: 2px solid #d6d4d4'">
                <v-row> 
                    <v-col cols="auto" class="me-auto pb-1">
                        {{ pollutant.displayName }}
                    </v-col>
                    <v-col cols="auto" class="pb-1">
                        {{ pollutant.concentration.value }} {{ concentrationMap[pollutant.concentration.units] }}
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="auto" class="me-auto pt-1">
                        {{ pollutant.fullName }}
                    </v-col>
                    <v-col cols="auto" class="pt-1">
                        <v-btn variant="text" density="compact" icon="mdi-information-outline" :color="isHovering ? 'black' : '#949494'"/>

                        <v-tooltip max-width="300" activator="parent" open-delay="200" :open-on-hover="false" open-on-click close-on-content-click :persistent="false">
                            <v-card-subtitle class="pl-0">
                                Effects
                            </v-card-subtitle>
                            {{ pollutant.additionalInfo.effects }}

                            <v-divider class="my-2"/>

                            <v-card-subtitle class="pl-0"> 
                                Sources
                            </v-card-subtitle>
                            {{ pollutant.additionalInfo.sources }}
                        </v-tooltip>
                    </v-col>
                </v-row>
            </v-card>
        </v-hover>
    </template>
</template>

<script setup lang="ts">
// Models
import { airPollutant } from "@/models/models";

const props = defineProps({
    pollutants: {
        type: Array<airPollutant>,
        required: true,
        default: []
    }
});

const concentrationMap = {
    "PARTS_PER_BILLION": "ppb",
    "MICROGRAMS_PER_CUBIC_METER": "μg/m³"
};
</script>