]
<template>
    <v-btn icon>
        <v-icon>mdi-file-document-plus-outline</v-icon>

        <v-dialog v-model="openedDialog" activator="parent" max-width="600">
            <v-card>
                <v-card-title class="mt-3">
                    <div class="d-flex">
                        <v-icon>mdi-file-document-plus-outline</v-icon>
                        <div class="ml-4">{{ $t("solar.toolbar.save.title") }}</div>
                    </div>
                </v-card-title>

                <v-card-text>
                    <div class="form-subtitle-in-card">{{ $t("solar.toolbar.save.included-data.title") }}</div>
                    <v-sheet class="form-section-in-sheet">
                        <v-switch
                            v-model="solarInsightsAndParameters"
                            class="switch-custom-label"
                            :label="$t(`solar.toolbar.save.included-data.insights-and-parameters`)"
                            color="theme"
                            density="compact"
                            inset
                        />

                        <v-switch
                            v-model="buildingAttributes"
                            class="switch-custom-label"
                            :label="$t(`solar.toolbar.save.included-data.building-attributes`)"
                            color="theme"
                            density="compact"
                            inset
                        />

                        <v-switch
                            v-model="panelConfiguration"
                            class="switch-custom-label"
                            :label="$t(`solar.toolbar.save.included-data.panel-config`)"
                            color="theme"
                            density="compact"
                            inset
                        />
                    </v-sheet>

                    <div class="form-subtitle-in-card">{{ $t("solar.toolbar.save.export-format.title") }}</div>
                    <v-sheet class="form-section-in-sheet">
                        <v-radio-group v-model="exportType" color="theme">
                            <v-radio
                                class="radio-custom-label"
                                :label="$t(`solar.toolbar.save.export-format.json`)"
                                value="json"
                            />
                        </v-radio-group>
                    </v-sheet>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn @click="openedDialog = false" class="font-weight-medium" variant="flat">
                        {{ $t("solar.toolbar.save.actions.cancel") }}
                    </v-btn>

                    <v-btn
                        @click="
                            openedDialog = false;
                            saveFile();
                        "
                        class="font-weight-medium"
                        variant="flat"
                        color="theme"
                    >
                        {{ $t("solar.toolbar.save.actions.save") }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSolarMapStore } from "@/stores/solarMapStore";
import { storeToRefs } from "pinia";
import { ExportType } from "@/helpers/types";

const solarMapStore = useSolarMapStore();

const {} = storeToRefs(solarMapStore);

const openedDialog = ref<boolean>(false);

const solarInsightsAndParameters = ref<boolean>(true); // userSolarData + financial
const buildingAttributes = ref<boolean>(true); // part of buildingInsights
const panelConfiguration = ref<boolean>(true); // part of buildingInsights

const exportType = ref<ExportType>("json");

function saveFile() {
    console.log("saving file");
}
</script>
