import { SOLAR_INSIGHTS_NEGATIVE_INFINITY } from "./constants";

function instanceIsNotNull(instance: any) {
    return instance !== null;
}

function instanceIsDefined(instance: any) {
    return instance !== undefined;
}

function instanceIsDefinedAndNotNull(instance: any) {
    return instanceIsDefined(instance) && instanceIsNotNull(instance);
}

function numberIsNotNaN(instance: number) {
    return !Number.isNaN(instance);
}

function numberHasValidValue(instance: number) {
    return instance !== SOLAR_INSIGHTS_NEGATIVE_INFINITY;
}

export function stringHasValue(str: string | undefined) {
    return instanceIsDefinedAndNotNull(str) && str !== "";
}

export function objectHasValue(obj: object | undefined) {
    return instanceIsDefinedAndNotNull(obj) && Object.keys(obj!).length !== 0;
}

export function numberHasValue(nb: number | null | undefined) {
    return instanceIsDefinedAndNotNull(nb) && numberIsNotNaN(nb) && numberHasValidValue();
}

export function numbersHaveValues(nbList: number[]) {
    for(let nb of nbList) {
        if (!numberHasValue(nb)) return false;
    }
    
    return true;
}