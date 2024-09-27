import React from 'react';
import { Navigate } from 'react-router-dom';

const PermissionMiddleware = ({ children, permission }) => {
  const permissions = localStorage.getItem('permissions'); // Lấy permissions từ localStorage
  console.log("P :", permissions)

  if (!permissions.includes(permission)) {
    return <Navigate to="/error404" />;
  }

  return React.cloneElement(children, { permissions, permission });
};

export default PermissionMiddleware;
