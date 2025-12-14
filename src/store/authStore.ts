// src/stores/authStore.ts

import { create } from 'zustand';

// Định nghĩa kiểu dữ liệu cho User Profile (sẽ nhận được từ JWT)
export interface UserProfile {
    id: string;
    username: string;
    email?: string;
    // Thêm các trường khác nếu cần
}

// Định nghĩa kiểu dữ liệu cho Auth Store
export interface AuthState {
    token: string | null;
    user: UserProfile | null;
    isAuthenticated: boolean;
    
    // Actions
    mockLogin: (mockToken: string, profile: UserProfile) => void;
    logout: () => void;
    getAccessToken: () => string | null;
}

const TOKEN_KEY = 'mock_auth_token';
const USER_KEY = 'mock_user_profile'; 

const getInitialState = (): AuthState => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userStr = localStorage.getItem(USER_KEY);
    
    let user: UserProfile | null = null;
    if (userStr) {
        try {
            user = JSON.parse(userStr) as UserProfile;
        } catch (e) {
            console.error("Error parsing user profile from localStorage", e);
        }
    }
    
    return {
        token: token || null,
        user: user,
        isAuthenticated: !!token,
        
        // Actions sẽ được định nghĩa ở dưới
        mockLogin: () => {}, 
        logout: () => {},
        getAccessToken: () => null,
    };
};

// Khởi tạo Zustand Store với kiểu AuthState
export const useAuthStore = create<AuthState>((set, get) => ({
    ...getInitialState(),

    mockLogin: (mockToken: string, profile: UserProfile) => {
        localStorage.setItem(TOKEN_KEY, mockToken);
        localStorage.setItem(USER_KEY, JSON.stringify(profile));
        set({
            token: mockToken,
            user: profile,
            isAuthenticated: true,
        });
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        set({
            token: null,
            user: null,
            isAuthenticated: false,
        });
    },
    
    getAccessToken: () => {
        // Lấy token trực tiếp từ localStorage cho chắc chắn
        return localStorage.getItem(TOKEN_KEY);
    }
}));