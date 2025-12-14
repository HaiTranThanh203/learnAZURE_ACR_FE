// src/components/NavBar.tsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // 1. Import từ React Router

export default function NavBar() {
    // 2. Lấy đường dẫn hiện tại để highlight active tab
    const location = useLocation();
    const currentPath = location.pathname;

    // Hàm kiểm tra xem tab nào đang active dựa trên URL
    const getLinkClass = (path: string) => {
        const base = "px-4 py-2 rounded-lg transition duration-150 font-medium block text-center no-underline"; // Thêm no-underline và block
        
        // So sánh URL hiện tại với path của nút
        // Dùng includes hoặc startsWith để active đúng
        const isActive = currentPath.includes(path); 

        if (isActive) {
            return `${base} bg-blue-600 text-white shadow-md`;
        }
        return `${base} text-gray-600 hover:bg-gray-200`;
    };

    return (
        <nav className="flex gap-3 p-4 border-b border-gray-200 bg-gray-50"> 
            {/* 3. Thay thế <button> bằng <Link> */}
            <Link 
                to="/todos" 
                className={getLinkClass('todos')}
            >
                Todos
            </Link>
            
            <Link 
                to="/employees" 
                className={getLinkClass('employees')}
            >
                Employees
            </Link>
            
            <Link 
                to="/products" 
                className={getLinkClass('products')}
            >
                Products
            </Link>
        </nav>
    );
}