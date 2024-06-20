import axios from "axios";
import { auth0 } from "@/plugins/auth";

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
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
