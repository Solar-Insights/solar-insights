import { Theme, TimeSerie, TimeSerieData, UserSolarData } from "@/helpers/types";
import { yearlyUtilityBillEstimates, installationCostCalc, yearlyCostWithoutSolar } from "@/helpers/solar/solarMath";
import { strToLargeNumberDisplay } from "@/helpers/util";
import { darkColor, lightColor } from "@/helpers/constants";

export function makeChartOptions(theme: Theme) {
    console.log("theme changed", theme)
    return {
        chart: {
            type: 'line',
            foreColor: textColorBasedOnTheme(theme),
            zoom: {
              enabled: false
            }
        },
        grid: {
            show: false
        },
        xaxis: {
            type: "datetime",
            axisBorder: {
                show: true
            },
            axisTicks: {
                show: true
            }
        },
        yaxis: {
            axisBorder: {
                show: true
            },
            axisTicks: {
                show: true
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
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left'
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

export function makeTimeSeriesFromUserSolarData(userSolarData: UserSolarData) {
    const yearsList: Date[] = makeYearsList(userSolarData);
    const cumulativeCostWithSolar: TimeSerieData = makeCumulativeCostWithSolar(userSolarData, yearsList);
    const cumulativeCostWithoutSolar: TimeSerieData = makeCumulativeCostWithoutSolar(userSolarData, yearsList);

    return [
        {
            name: 'Solar',
            data: cumulativeCostWithSolar
        },
        {
            name: 'Current',
            data: cumulativeCostWithoutSolar
        },
    ] as TimeSerie[];
}

function makeYearsList(userSolarData: UserSolarData) {
    const currentYear = new Date().getFullYear();
    const endOfLifespanYear = currentYear + userSolarData.installationLifespan;
    const yearsList = [];

    for (let i = currentYear; i < endOfLifespanYear; i++) {
        const currentYear = new Date();
        currentYear.setFullYear(i);
        yearsList.push(currentYear);
    }

    return yearsList
}

function makeCumulativeCostWithSolar(userSolarData: UserSolarData, yearsList: Date[]) {
    const utilityBillEstimates: number[] = yearlyUtilityBillEstimates(userSolarData);
    const cumulativeCostWithSolar: TimeSerieData = [];
    let costWithSolar = 0;

    for (let i = 0; i < userSolarData.installationLifespan; i++) {
        costWithSolar +=
            i == 0
                ? utilityBillEstimates[i] + installationCostCalc(userSolarData) - userSolarData.solarIncentives
                : utilityBillEstimates[i];
        cumulativeCostWithSolar.push([yearsList[i], Math.round(costWithSolar)]);
    }

    return cumulativeCostWithSolar;
}

function makeCumulativeCostWithoutSolar(userSolarData: UserSolarData, yearsList: Date[]) {
    const yearlyCostWithoutSolarEstimates: number[] = yearlyCostWithoutSolar(userSolarData);
    const cumulativeCostWithoutSolar: TimeSerieData = [];
    let costWithoutSolar = 0;

    for (let i = 0; i < userSolarData.installationLifespan; i++) {
        costWithoutSolar += yearlyCostWithoutSolarEstimates[i];
        cumulativeCostWithoutSolar.push([yearsList[i], Math.round(costWithoutSolar)]);
    }

    return cumulativeCostWithoutSolar;
}
