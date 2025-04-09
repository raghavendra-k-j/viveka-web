import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

class AdminApiClient {
    private static instance: AdminApiClient | null = null;
    private readonly axios: AxiosInstance;

    private constructor() {
        const schema = process.env.NEXT_PUBLIC_API_SCHEMA;
        const host = process.env.NEXT_PUBLIC_API_HOST;
        const port = process.env.NEXT_PUBLIC_API_PORT;
        const baseURL = `${schema}://${host}:${port}`;
        console.debug("Creating AdminApiClient instance with base URL: ", baseURL);

        this.axios = axios.create({
            baseURL: baseURL,
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.axios.interceptors.request.use(
            (config) => {
                const token = Cookies.get("accessToken");
                if (token && config.headers) {
                    config.headers["Authorization"] = token;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    public static getInstance(): AdminApiClient {
        if (this.instance === null) {
            this.instance = new AdminApiClient();
        }
        return this.instance;
    }

    public getAxios(): AxiosInstance {
        return this.axios;
    }
}

export default AdminApiClient;
