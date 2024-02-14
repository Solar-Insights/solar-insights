<template>
    <template v-for="(pollutant, i) in pollutants" :key="i">
        <v-hover v-slot="{ isHovering, props }" open-delay="100">
            <v-card
                v-bind="props"
                class="my-5 pa-2 pb-0 rounded-lg text-center"
                :class="isHovering ? 'hovering-over-card-style' : 'not-hovering-over-card-style'"
                :elevation="isHovering ? 4 : 0"
            >
                <div class="d-flex emphasis" :class="isHovering ? 'text-theme' : ''">
                    <div class="me-auto">
                        {{ pollutant.displayName }}
                    </div>
                    <div>{{ pollutant.concentration.value }} {{ concentrationMap[pollutant.concentration.units] }}</div>
                </div>

                <div class="d-flex detail-text">
                    <div class="me-auto my-auto">
                        {{ pollutant.fullName }}
                    </div>
                    <div>
                        <v-btn variant="text" density="compact" icon>
                            <v-icon size="small">mdi-information-outline</v-icon>
                        </v-btn>

                        <v-tooltip
                            max-width="300"
                            activator="parent"
                            open-delay="200"
                            :open-on-hover="false"
                            open-on-click
                            close-on-content-click
                            :persistent="false"
                        >
                            <div class="section-title">Effects</div>
                            <p>
                                {{ pollutant.additionalInfo.effects }}
                            </p>

                            <v-divider class="my-3" />

                            <div class="section-title">Sources</div>
                            <p>
                                {{ pollutant.additionalInfo.sources }}
                            </p>

                            <v-divider class="my-3" />

                            <div class="section-title">Solutions</div>
                            <p>
                                {{ pollutantsConstantsObject[pollutant.code].solution }}
                            </p>
                        </v-tooltip>
                    </div>
                </div>
            </v-card>
        </v-hover>
    </template>
</template>

<script setup lang="ts">
// Vue
import { ref } from "vue";
// Helpers
import { AirPollutant } from "solar-typing/src/airQuality";
import { pollutants as pollutantsConstants } from "@/helpers/constants";

const props = defineProps({
    pollutants: {
        type: Array<AirPollutant>,
        required: true,
        default: []
    }
});

const pollutantsConstantsObject = ref(pollutantsConstants);

const concentrationMap = {
    PARTS_PER_BILLION: "ppb",
    MICROGRAMS_PER_CUBIC_METER: "μg/m³"
};
</script>
