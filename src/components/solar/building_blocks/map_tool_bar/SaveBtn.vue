]
<template>
    <v-btn icon :disabled="requiredInfoUnavailable">
        <v-icon>mdi-file-document-plus-outline</v-icon>

        <v-dialog v-model="openedDialog" activator="parent" max-width="600">
            <v-card class="rounded-lg">
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
                            v-model="exportOptions.solarInsightsAndParameters"
                            class="switch-custom-label"
                            :label="$t(`solar.toolbar.save.included-data.insights-and-parameters`)"
                            color="theme"
                            density="compact"
                            inset
                        />

                        <v-switch
                            v-model="exportOptions.panelConfiguration"
                            class="switch-custom-label"
                            :label="$t(`solar.toolbar.save.included-data.panel-config`)"
                            color="theme"
                            density="compact"
                            inset
                        />
                    </v-sheet>

                    <div class="form-subtitle-in-card">{{ $t("solar.toolbar.save.export-format.title") }}</div>
                    <v-sheet class="form-section-in-sheet">
                        <v-radio-group v-model="exportOptions.exportType" color="theme">
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
import _ from "lodash";
import { ref, computed } from "vue";
import { useSolarMapStore } from "@/stores/solarMapStore";
import { storeToRefs } from "pinia";
import { InstallationExportOptions, getDefaultInstallationExportOptions } from "@/helpers/types";
import { downloadInstallationData } from "@/helpers/solar/math_and_data/downloads";

const solarMapStore = useSolarMapStore();

const { buildingInsights, userSolarData, panelConfig, address } = storeToRefs(solarMapStore);

const requiredInfoUnavailable = computed(() => {
    return (
        Object.keys(buildingInsights.value).length === 0 ||
        Object.keys(userSolarData.value).length === 0 ||
        panelConfig === undefined
    );
});

const openedDialog = ref<boolean>(false);

const exportOptions = ref<InstallationExportOptions>(getDefaultInstallationExportOptions());

function saveFile() {
    downloadInstallationData(
        exportOptions.value,
        buildingInsights.value,
        userSolarData.value,
        panelConfig.value!,
        address.value
    );
}
</script>
