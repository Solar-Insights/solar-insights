import { ExportType, InstallationExportOptions, UserSolarData } from "@/helpers/types";
import { BuildingInsights, SolarPanelConfig } from "geo-env-typing/solar";

function saveFileToLocal(data: any, suggestedName: string, exportType: ExportType) {
    const { blob, blobURL } = mapExportTypeToBlobFactory(data, exportType);

    const anchor = document.createElement("a");
    anchor.href = blobURL;
    anchor.download = suggestedName;
    anchor.style.display = "none";
    document.body.append(anchor);

    anchor.click();
    setTimeout(() => {
        URL.revokeObjectURL(blobURL);
        anchor.remove();
    }, 1000);
}

function mapExportTypeToBlobFactory(data: any, exportType: ExportType) {
    switch(exportType) {
        case "json":
            return jsonBlobFactory(data);
    };
}

function jsonBlobFactory(data: any) {
    const jsonData = JSON.stringify(data, null, 4);
    const blob = new Blob(
        [jsonData], 
        { 
            type: "application/json"
        }
    );
    const blobURL = URL.createObjectURL(blob);

    return { blob, blobURL };
}


export function downloadInstallationData(exportOptions: InstallationExportOptions, buildingInsights: BuildingInsights, userSolarData: UserSolarData, panelConfig: SolarPanelConfig) {
    const data = {
        "nom": "Mathis",
        "allo" : "alhuile"
    };

    const suggestedName = "solar_insights"

    saveFileToLocal(data, suggestedName, exportOptions.exportType);
}

function createExportedInstallationData() {

}
