import axios from "axios";
import CookieService from "../util/cookie-service.ts";

export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';
export const REFRESH_EXPIRES_DAYS = 7;
export const ACCESS_EXPIRES_DAYS = 1;

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
            // Skip auth header for login/refresh endpoints
            console.log('Adding token to request', config.headers.Authorization);
            if (!config.url?.startsWith('/api/v1/auth')) {
                const token = CookieService.getCookie(ACCESS_TOKEN_KEY);
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