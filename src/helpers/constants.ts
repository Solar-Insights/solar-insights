import { Pollutants } from "@/helpers/types";

/*
    Enhance interfaces
*/
export function circularBarColorSelector(value: string) {
    const numValue: number = Number(value);
    if (isNaN(numValue)) return "green";
    else if (numValue < 50) return "red";
    else if (numValue < 80) return "orange";
    else return "green";
}

export function batteryCharging(value: number) {
    if (value > 90) return "mdi-battery-charging-100";
    else if (value > 80) return "mdi-battery-charging-90";
    else if (value > 70) return "mdi-battery-charging-80";
    else if (value > 60) return "mdi-battery-charging-70";
    else if (value > 50) return "mdi-battery-charging-60";
    else if (value > 40) return "mdi-battery-charging-50";
    else if (value > 30) return "mdi-battery-charging-40";
    else if (value > 20) return "mdi-battery-charging-30";
    else if (value > 10) return "mdi-battery-charging-20";
    else if (value > 0) return "mdi-battery-charging-10";
}

/*
    Pollutants code and display name
    For an updated list of pollutants, visit https://developers.google.com/maps/documentation/air-quality/pollutants
*/
export const pollutants: Pollutants = {
    co: {
        code: "co",
        displayName: "CO",
        solution:
            "To mitigate the impact of CO emissions, ensure proper maintenance of all fuel-burning appliances and vehicles, while also opting for cleaner transportation options like walking, biking, or using public transit whenever possible. Additionally, consider planting trees around your home to naturally filter the air and reduce CO levels in your immediate environment."
    },
    c6h6: {
        code: "c6h6",
        displayName: "C6H6",
        solution:
            "To minimize the impact of C6H6 emissions, prioritize using eco-friendly household products and avoid activities that involve burning materials like wood or trash. Investing in indoor air purifiers with activated carbon filters can also help to effectively remove C6H6 from your home environment, promoting cleaner and healthier indoor air quality."
    },
    ox: {
        code: "ox",
        displayName: "OX",
        solution:
            "To minimize the impact of photochemical oxidants, limit outdoor activities during peak sunlight hours when pollutant levels are highest, and use electric or manual lawn care equipment instead of gas-powered alternatives. Additionally, support policies that promote the reduction of precursor emissions, such as vehicle exhaust and industrial emissions, to mitigate the formation of photochemical oxidants in the atmosphere."
    },
    o3: {
        code: "o3",
        displayName: "O3",
        solution:
            "To mitigate the effects of photochemical oxidants on your health, consider reducing your vehicle use by carpooling or using public transportation, and support initiatives for green spaces in urban areas, which can help absorb pollutants and improve air quality. Additionally, invest in air purifiers for your home to create a cleaner indoor environment and minimize exposure to harmful pollutants."
    },
    nh3: {
        code: "nh3",
        displayName: "NH3",
        solution:
            "To lessen the impact of NH3 on your environment, consider reducing your consumption of meat and dairy products, as livestock farming is a major source of ammonia emissions. Additionally, support sustainable agricultural practices that minimize fertilizer use and encourage the adoption of technologies like precision farming to reduce NH3 emissions from agricultural activities."
    },
    nhmc: {
        code: "nhmc",
        displayName: "NHMC",
        solution:
            "To mitigate the impact of NHMC on your health, prioritize walking, cycling, or using public transportation instead of driving alone, as vehicle emissions are a significant source of this pollutant. Additionally, advocate for stricter regulations on industrial emissions and support renewable energy initiatives to reduce overall NHMC emissions in your community."
    },
    no: {
        code: "no",
        displayName: "NO",
        solution:
            "To lessen the impact of NO on your health and the environment, opt for energy-efficient transportation options like biking or walking, which produce minimal nitrogen oxide emissions compared to vehicles. Additionally, regularly maintain your vehicle to ensure it operates efficiently and emits fewer pollutants into the air."
    },
    nox: {
        code: "nox",
        displayName: "NOX",
        solution:
            "To reduce NOX emissions, consider carpooling or using public transportation to decrease vehicle exhaust, a major source of nitrogen oxides. Additionally, maintaining your vehicle regularly can help ensure it operates efficiently and emits fewer pollutants into the air."
    },
    no2: {
        code: "no2",
        displayName: "NO2",
        solution:
            "To minimize the impact of NO2 on your health, avoid spending prolonged periods near busy roads, where traffic emissions contribute to higher levels of nitrogen dioxide. Additionally, consider using eco-friendly cleaning products and limiting indoor activities like cooking with gas stoves, as these can release NO2 indoors."
    },
    pm25: {
        code: "pm25",
        displayName: "PM2.5",
        solution:
            "To mitigate the impact of PM2.5 on your health, use indoor air purifiers with HEPA filters to reduce exposure to fine particulate matter indoors, where levels can often be higher than outdoors. Additionally, avoid outdoor activities during times of high pollution and wear a mask rated for PM2.5 filtration when necessary to further reduce inhalation of harmful particles."
    },
    pm10: {
        code: "pm10",
        displayName: "PM10",
        solution:
            "To minimize the impact of PM10 on your health, try to reduce dust and dirt around your home by regularly cleaning floors, carpets, and surfaces to prevent particulate matter from accumulating indoors. Additionally, consider using indoor air purifiers with HEPA filters to further reduce exposure to larger particulate matter particles, especially if you live in areas prone to dust or pollution."
    },
    so2: {
        code: "so2",
        displayName: "SO2",
        solution:
            "To reduce SO2 emissions, opt for cleaner energy sources like renewable energy or electric appliances, which emit fewer sulfur dioxide pollutants compared to burning fossil fuels. Additionally, using low-sulfur fuels and employing emission control technologies can help mitigate the impact of SO2 on air quality."
    },
    trs: {
        code: "trs",
        displayName: "TRS",
        solution:
            "To lessen TRS emissions, avoid products containing sulfur compounds and promote improved waste management practices in industries like pulp and paper manufacturing. These actions can help reduce the release of total reduced sulfur into the atmosphere, improving air quality and minimizing odor issues."
    }
};

/*
    Solar colors and data
*/
export const darkColor = "#212121";

export const lightColor = "#FFFFFF";

export const binaryPalette = ["212121", "B3E5FC"];

export const rainbowPalette = ["3949AB", "81D4FA", "66BB6A", "FFE082", "E53935"];

export const ironPalette = ["00000A", "91009C", "E64616", "FEB400", "FFFFF6"];

export const sunlightPalette = ["212121", "FFCA28"];

export const panelsPalette = ["E8EAF6", "1A237E"];

export const monthCodes = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

export const hourCodes = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00"
];
