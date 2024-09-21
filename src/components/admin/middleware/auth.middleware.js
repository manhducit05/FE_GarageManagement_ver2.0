import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Cookies from 'js-cookie';

const checkToken = () => {
  const token = Cookies.get('token'); // Giả sử cookie lưu token tên là 'token'
  return token ? true : false;
};

const PrivateRoute = () => {
  return checkToken() ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
