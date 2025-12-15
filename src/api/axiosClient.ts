// src/services/axiosClient.ts
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

// Giả định bạn có file endpoints.ts để lưu API_BASE_URL
import { API_BASE_URL } from './endpoints'; 
import { useAuthStore } from '../store/authStore'; 

// Tạo Axios instance
const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ==========================================================
// 1. Interceptor: Thêm Token vào Request
// ==========================================================

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Lấy token từ store
        const token = useAuthStore.getState().getAccessToken(); 

        if (token && config.headers) {
            // Thêm Authorization Header
            // Với InternalAxiosRequestConfig, TS hiểu headers luôn tồn tại
            config.headers.Authorization = `Bearer ${token}`;
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

            // Tùy chọn: Chuyển hướng người dùng (nếu cần)
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosClient;