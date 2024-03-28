import axios from "axios";
import { useUserSessionStore } from "@/stores/userSessionStore";

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_DEV_URL
});

AxiosInstance.interceptors.request.use(
    (config) => {
        useUserSessionStore().pendingApiRequest++;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    (config) => {
        useUserSessionStore().pendingApiRequest--;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosInstance;
