// src/App.tsx

import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import NavBar from './components/NavBar';
import EmployeeList from './components/EmployeeList'; // Đảm bảo import đúng file .tsx
import ProductList from './components/ProductList';   // Đảm bảo import đúng file .tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 

function App() {

  return (
    <BrowserRouter> 
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
          
          {/* SỬA LỖI TẠI ĐÂY: Gọi NavBar không cần props nữa */}
          <NavBar /> 
          
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">MindX App</h1>

            <Routes>
              {/* Redirect từ root / sang /todos */}
              <Route path="/" element={<Navigate to="/todos" replace />} />
              
              <Route path="/todos" element={
                <div>
                  <AddTodoForm />
                  <TodoList />
                </div>
              } />

              <Route path="/employees" element={<EmployeeList />} />

              <Route path="/products" element={<ProductList />} />

              <Route path="*" element={<h2>404 - Not Found</h2>} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;