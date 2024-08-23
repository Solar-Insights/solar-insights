import { VITE_ENV_MODE } from "@/env";

export type EnvMode = "dev" | "prod";

export function POP_LOG_DEBUG(data: any) {
    switch (VITE_ENV_MODE) {
        case "dev":
            console.log(data);
            break;
        default:
            break;
    }
}
