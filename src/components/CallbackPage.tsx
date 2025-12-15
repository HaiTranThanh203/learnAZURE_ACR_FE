import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient'; 
import { useAuthStore } from '../store/authStore'; // Store Zustand của bạn

const CallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mockLogin = useAuthStore((state) => state.mockLogin); // Hàm login trong store
  const calledRef = useRef(false); // Chặn gọi 2 lần (React 18)

  useEffect(() => {
    const code = searchParams.get('code');

    if (code && !calledRef.current) {
      calledRef.current = true;
      
      // Gọi về Backend của BẠN để đổi token
      axiosClient.post('/auth/login-mindx', { code })
        .then((res) => {
          const { token, user } = res.data;
          console.log("Đăng nhập thành công!", user);
          
          // Lưu token vào Store/LocalStorage
          mockLogin(token, user);
          
          // Chuyển hướng về trang chủ
          navigate('/');
        })
        .catch((err) => {
          console.error("Lỗi Login:", err);
          alert("Đăng nhập thất bại! Vui lòng thử lại.");
          navigate('/'); 
        });
    }
  }, [searchParams, navigate, mockLogin]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold">Đang xử lý đăng nhập MindX...</h2>
      <p>Vui lòng đợi trong giây lát.</p>
    </div>
  );
};

export default CallbackPage;