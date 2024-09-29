import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Thư viện để lưu token vào cookies
import { Alert, Space, Badge } from 'antd';
import "./login.css"


const LoginAdmin = () => {
  const API = process.env.REACT_APP_API_URL_ADMIN;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const tokenCheck = Cookies.get('token');
  useEffect(() => {
    if (tokenCheck != undefined)
      navigate('/admin/dashboard');
  }, [tokenCheck]);
  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn reload lại trang

    const loginData = {
      email: email,
      password: password
    };


    try {
      // Gửi yêu cầu đăng nhập
      const response = await fetch(`${API}/accounts/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      // Chuyển đổi phản hồi thành JSON
      const data = await response.json();
      console.log(data)

      if (response.ok) {
        // Lấy token từ phản hồi của API
        const token = data.token; // Giả sử API trả về token trong thuộc tính 'token'

        // Lưu token vào cookies
        if (token !== undefined && token !== null) {
          // Store the token in a cookie, set to expire in 1 day
          Cookies.set('token', token, { expires: 1 });
        } else {
          // Display an error alert if the token is undefined or null
          setShowErrorAlert(true)
        }
        // Kiểm tra xem token đã được lưu chưa
        const storedToken = Cookies.get('token');
        console.log('Stored Token:', storedToken);

        // Xử lý tiếp theo sau khi đăng nhập thành công
        // Ví dụ: Chuyển hướng sang trang admin
        if (storedToken != undefined) {
          navigate('/admin/dashboard');;
        }
      } else {
        // Xử lý khi đăng nhập không thành công
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Lỗi hệ thống:', error);
    }
  };

  return (
    <>

      <div className="login-background">
        <div className="login-box">

          <h3>Đăng nhập quản trị</h3>
          <form onSubmit={handleLogin}>
            <div>
              <input
                placeholder='Tài khoản'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='mt-3' style={{
              position: "relative"
            }}>
              <input
                placeholder='Mật khẩu'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Space direction="vertical" style={{
                position: "absolute", width: '240px',
                left: "39%", top: "50px"
              }}>

                {showErrorAlert && (
                  <Badge key={"red"} color={"red"} text={
                    <span style={{ color: "white" }}>Sai tên đăng nhập hoặc mật khẩu</span>
                  } />
                )}
              </Space>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className='btn-loginAdmin' style={{ marginTop: "35px" }} type="submit">Đăng nhập</button>
          </form>
        </div >
      </div >
    </>
  );
};

export default LoginAdmin;
