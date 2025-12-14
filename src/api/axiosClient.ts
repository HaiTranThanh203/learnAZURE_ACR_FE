// src/services/axiosClient.ts
import axios, {  AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
// Giả định bạn có file endpoints.ts để lưu API_BASE_URL
import { API_BASE_URL } from './endpoints'; 
import { useAuthStore } from '../store/authStore'; 

// Tạo Axios instance với kiểu trả về là AxiosInstance
const axiosClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ==========================================================
// 1. Interceptor: Thêm Token vào Request (Mock Auth)
// ==========================================================

axiosClient.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // Lấy token từ store bằng .getState()
        // Dùng .getState() để truy cập store bên ngoài component React
        const token = useAuthStore.getState().getAccessToken(); 

        if (token) {
            // Thêm Authorization Header
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            } as Record<string, string | number | boolean>; // Ép kiểu cho headers
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

// ==========================================================
// 2. Interceptor: Xử lý lỗi 401 (Unauthenticated)
// ==========================================================

axiosClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        // Kiểm tra nếu lỗi là 401 Unauthorized
        if (error.response && error.response.status === 401) {
            console.error("Token expired or unauthorized. Logging out.");
            
            // Tự động gọi logout từ store
            useAuthStore.getState().logout();

            // Tùy chọn: Chuyển hướng người dùng về trang login
            // Nếu bạn dùng react-router, nên dùng hook navigate trong component.
            // Nếu dùng ngoài component: window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosClient;