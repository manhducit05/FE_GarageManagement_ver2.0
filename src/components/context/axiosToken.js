import axios from 'axios';
import Cookies from 'js-cookie'; // Thư viện để lưu token vào cookies

// Tạo instance của Axios
const axiosToken = axios.create({
  baseURL: process.env.REACT_APP_API_URL_ADMIN, // Địa chỉ API của bạn
});

// Sử dụng interceptor để tự động thêm token vào headers
axiosToken.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); // Lấy token từ localStorage
    console.log(token)
    if (token != undefined) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosToken;
