// src/App.tsx (ĐÃ SỬA)

import React ,{useEffect}from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 

import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import NavBar from './components/NavBar';
import EmployeeList from './components/EmployeeList'; 
import ProductList from './components/ProductList';   
import ProtectedRoute from './components/ProtectedRoute'; // <-- IMPORT MỚI
import MockLogin from './components/MockLogin'; // IMPORT COMPONENT MOCK LOGIN
import CallbackPage from './components/CallbackPage';
import { initGA, logPageView, logEvent } from './analytics';
function App() {
useEffect(() => {
    initGA();      // Kết nối Google
    logPageView(); // Ghi nhận trang đầu tiên
  }, []);
  return (
    // <AuthProvider> // Giả định bạn đã bọc AuthProvider trong main.tsx (hoặc dùng Zustand không cần Provider)
    <BrowserRouter> 
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
          
          <NavBar /> 
          
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">MindX App</h1>

            <Routes>
              {/* PUBLIC ROUTE: Ai cũng vào được */}
              <Route path="/" element={<Navigate to="/todos" replace />} />
              <Route path="/todos" element={
                <div>
                  <AddTodoForm />
                  <TodoList />
                </div>
              } />
              <Route path="/callback" element={<CallbackPage />} />
              {/* PROTECTED ROUTES: Phải đăng nhập mới vào được */}
              <Route 
                  path="/employees" 
                  element={<ProtectedRoute element={<EmployeeList />} />} 
              />
              <Route 
                  path="/products" 
                  element={<ProtectedRoute element={<ProductList />} />} 
              />

              {/* Thêm Route cho trang Login, nếu muốn tách ra khỏi NavBar */}
              <Route path="/login" element={
                <div className="text-center p-10"><MockLogin /></div>
              } />

              <Route path="*" element={<h2>404 - Not Found</h2>} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;