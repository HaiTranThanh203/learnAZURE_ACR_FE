// src/components/MockLogin.tsx

import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const MOCK_API_URL = 'http://localhost:3000'; // Đảm bảo URL này đúng

const MockLogin: React.FC = () => {
    // Lấy action mockLogin từ Zustand
    const mockLogin = useAuthStore((state) => state.mockLogin); 
    const navigate = useNavigate();
    
    // Giả định user đã mock ở backend là 'testuser'
    const [username, setUsername] = useState('testuser'); 
    const [password, setPassword] = useState('123456'); // Nếu backend yêu cầu
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            // 1. Gọi Backend để lấy token giả lập
            const response = await axios.post(`${MOCK_API_URL}/auth/login`, { username, password });
            console.log('Mock login response:', response.data);
            const { token } = response.data;
            
            // 2. Lưu token và profile vào Zustand Store
            mockLogin(token, { 
                id: 'mock-id-' + Math.random().toString(36).substring(2, 9), 
                username: username, 
                email: `${username}@mindx.vn`
            });
            
            // Chuyển hướng về trang chủ sau khi đăng nhập thành công
            navigate('/');
            
        } catch (err) {
            setError('Đăng nhập giả lập thất bại. Kiểm tra API Backend MOCK.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2 items-center">
            {/* Input chỉ để hiển thị user (vì backend chỉ kiểm tra username testuser) */}
            <input 
                type="text" 
                value={username} 
                readOnly 
                className="bg-gray-200 text-gray-700 py-1 px-3 rounded text-sm w-24"
            />
            
            <button 
                type="submit" 
                disabled={loading}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm disabled:opacity-50"
            >
                {loading ? '...' : 'Login Mock'}
            </button>
            {error && <p className="text-red-300 text-xs ml-2">{error}</p>}
        </form>
    );
};
export default MockLogin;