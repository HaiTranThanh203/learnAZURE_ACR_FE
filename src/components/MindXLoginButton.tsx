import React from 'react';
import {  logEvent } from '../analytics';
const MindXLoginButton = () => {
  const handleLogin = () => {
    logEvent("User_Auth", "Click_Login_SSO", "Button_MindX_Login");
  // Config CỨNG domain Azure tại đây để đảm bảo không bị sai
  const CLIENT_ID = 'mindx-onboarding';
  // Redirect URI này phải khớp 100% với cái bạn gửi chị Duyên và trong .env Backend
  const REDIRECT_URI = 'https://haimindx-app-djamcah4c6b0fyb3.z03.azurefd.net/callback'; 
  
  // *** THAY ĐỔI Ở ĐÂY: Thêm &prompt=login vào cuối URL ***
  const targetUrl = 
    `https://id-dev.mindx.edu.vn/auth?` +
    `client_id=${CLIENT_ID}&` +
    `redirect_uri=${REDIRECT_URI}&` +
    `response_type=code&` +
    `scope=openid%20profile%20email&` + 
    `prompt=login`; // <--- Đã thêm tham số BUỘC ĐĂNG NHẬP LẠI
  // ******************************************************
  
  window.location.href = targetUrl;
};

  return (
    <button 
      onClick={handleLogin}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Đăng nhập qua MindX (SSO)
    </button>
  );
};

export default MindXLoginButton;