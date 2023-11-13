export function circularBarColorSelector(value: string) {
    const num_value: number = Number(value);
    if ( isNaN(num_value)) return "green";
    else if ( num_value < 50 ) return "red";
    else if ( num_value < 80 ) return "orange";
    else return "green";
}

// For an updated list of pollutants, visit https://developers.google.com/maps/documentation/air-quality/pollutants
export const pollutants = {
    co: {
        code: "co",
        displayName: "CO"
    },
    c6h6 : {
        code: "c6h6",
        displayName: "C6H6"
    },
    ox : {
        code: "ox",
        displayName: "OX"
    },
    o3 : {
        code: "o3",
        displayName: "O3"
    },
    nh3 : {
        code: "nh3",
        displayName: "NH3"
    },
    nhmc : {
        code: "nhmc",
        displayName: "NHMC"
    },
    no : {
        code: "no",
        displayName: "NO"
    },
    nox : {
        code: "nox",
        displayName: "NOX"
    },
    no2 : {
        code: "no2",
        displayName: "NO2"
    },
    pm25 : {
        code: "pm25",
        displayName: "PM2.5"
    },
    pm10 : {
        code: "pm10",
        displayName: "PM10"
    },
    so2 : {
        code: "so2",
        displayName: "SO2"
    },
    trs : {
        code: "trs",
        displayName: "TRS"
    },
};