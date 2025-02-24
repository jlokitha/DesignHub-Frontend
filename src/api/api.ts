import axios from "axios";
import CookieService from "../util/cookie-service.ts";

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
});

export const setupAxiosInterceptors = (
    refreshTokenFn: () => Promise<string | null>
) => {
    // Request interceptor
    api.interceptors.request.use(
        (config) => {
            if (!config.url?.startsWith('/auth')) {
                const token = CookieService.getCookie(CookieService.ACCESS_TOKEN_KEY);
                if (token) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const newToken = await refreshTokenFn();
                    if (newToken) {
                        originalRequest.headers = originalRequest.headers || {};
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );
};

export default api;