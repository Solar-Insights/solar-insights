import dotenv from "dotenv";

dotenv.config();

// Server
export const VITE_GOOGLE_API_KEY: string = process.env.VITE_GOOGLE_API_KEY as string; // API Key
export const VITE_SERVER_URL: string = process.env.VITE_SERVER_URL as string; // Server URL

// Authentication
export const VITE_AUTH0_DOMAIN: string = process.env.VITE_AUTH0_DOMAIN as string; // Authentication url (seen when logging in)
export const VITE_AUTH0_CLIENT_ID: string = process.env.VITE_AUTH0_CLIENT_ID as string; // Client ID
export const VITE_AUTH0_AUDIENCE: string = process.env.VITE_AUTH0_AUDIENCE as string; // Audience to request API access
