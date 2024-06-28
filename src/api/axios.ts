import axios from "axios";
import { auth0 } from "@/plugins/auth";
import { VITE_SERVER_URL } from "@/env";

const AxiosInstance = axios.create({
    baseURL: VITE_SERVER_URL
});

AxiosInstance.interceptors.request.use(
    async (config) => {
        const { getAccessTokenSilently } = auth0;
        await getAccessTokenSilently()
            .then((accessToken) => {
                config.headers.Authorization = `Bearer ${accessToken}`;
            })
            .catch((error) => {});

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosInstance;
