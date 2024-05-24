import { RouteInfo } from "@/helpers/types";

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

// All available routes for the sitemap in footer. Helps for appbar too
export const routes: RouteInfo[] = [
    {
        section: "solar-insights",
        name: "home",
        icon: "mdi-home-outline",
        requiresAuth: false,
        displaysAppBarAndFooter: true
    },
    {
        section: "solar-insights",
        name: "get-started",
        icon: "mdi-rocket-launch-outline",
        requiresAuth: false,
        displaysAppBarAndFooter: true
    },
    {
        section: "solar-insights",
        name: "pricing",
        icon: "mdi-currency-usd",
        requiresAuth: false,
        displaysAppBarAndFooter: true
    },
    {
        section: "services",
        name: "my-organization",
        icon: "mdi-weather-sunny",
        requiresAuth: true,
        displaysAppBarAndFooter: true
    },
    {
        section: "services",
        name: "search",
        icon: "mdi-weather-sunny",
        requiresAuth: false,
        displaysAppBarAndFooter: true
    }
];

export const menus = [
    {
        menuName: "user",
        icon: "mdi-account-outline"
    },
    {
        menuName: "settings",
        icon: "mdi-cog-outline"
    }
];
