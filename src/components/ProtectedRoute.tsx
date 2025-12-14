// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import  { useAuthStore } from '../store/authStore'; // Import từ Zustand Store

// Định nghĩa kiểu dữ liệu cho props
interface ProtectedRouteProps {
  element: React.ReactElement; // Component đích (ví dụ: <EmployeeList />)
  redirectTo?: string; // Trang chuyển hướng khi chưa đăng nhập
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, redirectTo = "/login" }) => {
    // Lấy trạng thái xác thực từ Zustand Store
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    if (!isAuthenticated) {
        // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
        return <Navigate to={redirectTo} replace />;
    }

    // Nếu đã đăng nhập, hiển thị component đích
    return element;
};

export default ProtectedRoute;