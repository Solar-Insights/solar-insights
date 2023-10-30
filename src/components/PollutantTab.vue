<template>
    <template v-for="(pollutant, i) in pollutantsInformations" :key="i">
        <v-hover v-slot="{ isHovering, props }">
            <v-card v-bind="props" class="ma-3 pa-2 rounded-lg" variant="text" :style="isHovering ? 'color: black; border: 2px solid #4C8BF5;' : 'color: #949494; border: 2px solid #d6d4d4'">
                <v-row>
                    <v-col cols="auto" class="me-auto pb-1">
                        {{ pollutant.displayName }}
                    </v-col>
                    <v-col cols="auto" class="pb-1">
                        {{ pollutant.concentration }} {{ pollutant.unitsMeasured }}
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
                            {{ pollutant.effects }} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque saepe sint laboriosam maxime, animi magni ab veniam, nisi natus quam eius beatae tempore quisquam qui molestias architecto nihil pariatur maiores?

                            <v-divider class="my-2"/>

                            <v-card-subtitle class="pl-0"> 
                                Sources
                            </v-card-subtitle>
                            {{ pollutant.sources }}
                        </v-tooltip>
                    </v-col>
                </v-row>
            </v-card>
        </v-hover>
    </template>
</template>

<script setup lang="ts">
// Vue
import { ref, reactive } from 'vue';

const pollutantsInformations = reactive({
    co: {
        index: 0,
        code: "co",
        displayName: "CO",
        fullName: "Carbon monoxide",
        unitsMeasured: "ppb",
        concentration: 101.10,
        effects: "effects blabla",
        sources: "sources blabla"
    },
    c6h6 : {
        index: 1,
        code: "c6h6",
        displayName: "C6H6",
        fullName: "Benzene",
        unitsMeasured: "μg/m³",
        concentration: 11.977,
        effects: "effects blabla",
        sources: "sources blabla"
    },
    ox : {
        index: 2,
        code: "ox",
        displayName: "OX",
        fullName: "Photochemical oxidants",
        unitsMeasured: "ppb",
        concentration: 20.10,
        effects: "effects blabla",
        sources: "sources blabla"
    },
});
</script>