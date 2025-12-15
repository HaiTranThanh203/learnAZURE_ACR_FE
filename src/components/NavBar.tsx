// src/components/NavBar.tsx (ĐÃ SỬA)

import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { useAuthStore } from '../store/authStore'; // <-- IMPORT ZUSTAND
import MindXLoginButton from './MindXLoginButton';

export default function NavBar() {
    const location = useLocation();
    const currentPath = location.pathname;

    // Lấy trạng thái và action từ Zustand Store
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const user = useAuthStore(state => state.user);
    const logout = useAuthStore(state => state.logout);

    const getLinkClass = (path: string) => {
        const base = "px-4 py-2 rounded-lg transition duration-150 font-medium no-underline"; 
        const isActive = currentPath.includes(path); 

        if (isActive) {
            return `${base} bg-blue-600 text-white shadow-md`;
        }
        return `${base} text-gray-600 hover:bg-gray-200`;
    };

    return (
        <nav className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center"> 
            <div className="flex gap-3">
                {/* Các nút điều hướng */}
                <Link to="/todos" className={getLinkClass('todos')}>Todos</Link>
                <Link to="/employees" className={getLinkClass('employees')}>Employees</Link>
                <Link to="/products" className={getLinkClass('products')}>Products</Link>
            </div>

            {/* PHẦN HIỂN THỊ ĐĂNG NHẬP/ĐĂNG XUẤT */}
            <div className="flex items-center space-x-3">
                {isAuthenticated ? (
                    // Đã đăng nhập
                    <>
                        <span className="text-sm font-medium text-gray-700">
                            Chào, {user?.username}
                        </span>
                        <button 
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
                        >
                            Đăng xuất
                        </button>
                    </>
                ) : (
                    // Chưa đăng nhập (Hiển thị Mock Login)
                    <MindXLoginButton /> 
                )}
            </div>
        </nav>
    );
}