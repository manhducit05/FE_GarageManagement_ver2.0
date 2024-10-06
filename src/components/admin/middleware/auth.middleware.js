import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie'; // Để lưu và truy xuất token từ cookie

const PrivateRoute = () => {
  const API = process.env.REACT_APP_API_URL_ADMIN;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Để xử lý khi chờ phản hồi API

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get('token'); // Lấy token từ cookie

      try {
        const response = await fetch(`${API}/accounts/checkToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Gửi token trong header
          }
        });

        const result = await response.json();
        if (result.code == 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi đang kiểm tra token
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
