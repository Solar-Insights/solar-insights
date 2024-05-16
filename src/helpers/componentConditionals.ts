function instanceIsNotNull(instance: any) {
    return instance !== null;
}

function instanceIsDefined(instance: any) {
    return instance !== undefined;
}

function instanceIsDefinedAndNotNull(instance: any) {
    return instanceIsDefined(instance) && instanceIsNotNull(instance);
}

export function stringHasValue(str: string | undefined) {
    return instanceIsDefinedAndNotNull(str) && str !== "";
}

export function objectHasValue(obj: object | undefined) {
    return instanceIsDefinedAndNotNull(obj) && Object.keys(obj!).length !== 0;
}
