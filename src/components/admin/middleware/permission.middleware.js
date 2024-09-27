import React from 'react';
import { Navigate } from 'react-router-dom';

const PermissionMiddleware = ({ children, permission }) => {
  const permissions = localStorage.getItem('permissions'); // Lấy permissions từ localStorage
  console.log("P :", permissions)

  // let permissions = [];
  // Kiểm tra và phân tích cú pháp nếu permissionsString không phải là null
  // if (permissionsString) {
  //   try {
  //     permissions = JSON.parse(permissionsString);
  //   } catch (error) {
  //     console.error("Error parsing permissions:", error);
  //   }
  // }

  // if (!permissions.includes(permission)) {
  //   return <Navigate to="/error404" />;
  // }

  return React.cloneElement(children, { permissions, permission });
};

export default PermissionMiddleware;
