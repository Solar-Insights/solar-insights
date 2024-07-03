import { EnvMode } from "@/plugins/logger";

// App
export const VITE_ENV_MODE: EnvMode = import.meta.env.VITE_ENV_MODE as EnvMode // dev or prod mode to handle logging and other;

// Server
export const VITE_GOOGLE_API_KEY: string = import.meta.env.VITE_GOOGLE_API_KEY as string; // API Key
export const VITE_SERVER_URL: string = import.meta.env.VITE_SERVER_URL as string; // Server URL

// Authentication
export const VITE_AUTH0_DOMAIN: string = import.meta.env.VITE_AUTH0_DOMAIN as string; // Authentication url (seen when logging in)
export const VITE_AUTH0_CLIENT_ID: string = import.meta.env.VITE_AUTH0_CLIENT_ID as string; // Client ID
export const VITE_AUTH0_AUDIENCE: string = import.meta.env.VITE_AUTH0_AUDIENCE as string; // Audience to request API access
