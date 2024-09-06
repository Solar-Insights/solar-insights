import { FinancialParameters, PanelParameters, Theme, TimeSerie, TimeSerieData, UserSolarData } from "@/helpers/types";
import {
    makeCumulativeCostWithoutSolar,
    makeCumulativeCostWithSolar
} from "@/helpers/solar/math_and_data/yearlyAndCumulativeCosts";
import { strToLargeNumberDisplay } from "@/helpers/util";
import { darkColor, lightColor } from "@/helpers/constants";

export function makeChartOptions(theme: Theme) {
    return {
        chart: {
            type: "line",
            foreColor: textColorBasedOnTheme(theme),
            background: mainColorBasedOnTheme(theme),
            zoom: {
                enabled: false
            }
        },
        xaxis: {
            type: "datetime",
            tooltip: {
                enabled: false
            },
            axisBorder: {
                show: true,
                color: textColorBasedOnTheme(theme)
            },
            axisTicks: {
                show: true,
                color: textColorBasedOnTheme(theme)
            }
        },
        yaxis: {
            axisBorder: {
                show: true,
                color: textColorBasedOnTheme(theme)
            },
            axisTicks: {
                show: true,
                color: textColorBasedOnTheme(theme)
            },
            labels: {
                formatter: function (value: any) {
                    return strToLargeNumberDisplay(value) + "$";
                }
            }
        },
        tooltip: {
            x: {
                format: "yyyy"
            }
        },
        legend: {
            position: "top",
            horizontalAlign: "left"
        },
        grid: {
            show: false
        }
    };
}

function mainColorBasedOnTheme(theme: Theme) {
    if (theme === "light") {
        return lightColor;
    } else {
        return darkColor;
    }
}

function textColorBasedOnTheme(theme: Theme) {
    if (theme === "light") {
        return darkColor;
    } else {
        return lightColor;
    }
}

export function makeTimeSeriesFromUserSolarData(
    userSolarData: UserSolarData,
    financialParameters: FinancialParameters,
    panelParameters: PanelParameters
) {
    const yearsList: Date[] = makeYearsList(financialParameters);
    const cumulativeCostWithSolarTimeSerie: TimeSerieData = makeCumulativeCostWithSolarTimeSerie(
        userSolarData,
        financialParameters,
        panelParameters,
        yearsList
    );
    const cumulativeCostWithoutSolarTimeSerie: TimeSerieData = makeCumulativeCostWithoutSolarTimeSerie(
        userSolarData,
        financialParameters,
        yearsList
    );

    return [
        {
            name: "Solar",
            color: "#FCB103",
            data: cumulativeCostWithSolarTimeSerie
        },
        {
            name: "Current",
            data: cumulativeCostWithoutSolarTimeSerie
        }
    ] as TimeSerie[];
}

function makeYearsList(financialParameters: FinancialParameters) {
    const firstYear = new Date().getFullYear() + 1;
    const endOfLifespanYear = firstYear + financialParameters.installationLifespan;
    const yearsList = [];

    for (let i = firstYear; i < endOfLifespanYear; i++) {
        const currentYear = new Date();
        currentYear.setFullYear(i);
        yearsList.push(currentYear);
    }

    return yearsList;
}

function makeCumulativeCostWithSolarTimeSerie(
    userSolarData: UserSolarData,
    financialParameters: FinancialParameters,
    panelParameters: PanelParameters,
    yearsList: Date[]
) {
    const timeSerie: TimeSerieData = [];
    const cumulativeCostWithSolar: number[] = makeCumulativeCostWithSolar(
        userSolarData,
        financialParameters,
        panelParameters
    );

    for (let i = 0; i < financialParameters.installationLifespan; i++) {
        timeSerie.push([yearsList[i], cumulativeCostWithSolar[i]]);
    }

    return timeSerie;
}

function makeCumulativeCostWithoutSolarTimeSerie(
    userSolarData: UserSolarData,
    financialParameters: FinancialParameters,
    yearsList: Date[]
) {
    const timeSerie: TimeSerieData = [];
    const cumulativeCostWithoutSolar: number[] = makeCumulativeCostWithoutSolar(userSolarData, financialParameters);

    for (let i = 0; i < financialParameters.installationLifespan; i++) {
        timeSerie.push([yearsList[i], cumulativeCostWithoutSolar[i]]);
    }

    return timeSerie;
}
