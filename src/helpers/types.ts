export type TimeParameters = {
    tick: number;
    month: number;
    day: number;
    hour: number;
};

export type Alert = {
    type: AlertType,
    title: string,
    message: string
};

export type AlertType = "warning" | "error" | "success";