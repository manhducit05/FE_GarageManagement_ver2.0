import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Thư viện để lưu token vào cookies
import { Alert, Space, Badge } from 'antd';
import "./register.css"

const RegisterClient = () => {
  const API = process.env.REACT_APP_API_URL_ADMIN;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleTextLogin = async (e) => {
    navigate("/login")
  };

  const handleRegister = () => {

  }

  return (
    <>
      <div className="register-box-client">

        <h3>Đăng ký</h3>
        <form onSubmit={handleRegister} className='mt-3 form-register' id='form-register'>
          <div>
            <input
              placeholder='Họ tên'
              type="text"
              name='fullName'
              required
            />
          </div>
          <div className='mt-3' style={{
            position: "relative"
          }}>
            <input
              placeholder='Email'
              type="email"
              name='email'
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

          <div className='mt-3' style={{
            position: "relative"
          }}>
            <input
              placeholder='Số điện thoại'
              type="text"
              name='phone'
              required
            />
          </div>

          <div className='mt-3' style={{
            position: "relative"
          }}>
            <input
              placeholder='Tên đăng nhập'
              type="text"
              name='username'
              required
            />
          </div>

          <div className='mt-3' style={{
            position: "relative"
          }}>
            <input
              placeholder='Mật khẩu'
              type="password"
              name='password'
              required
            />
          </div>

          <div className='mt-3' style={{
            position: "relative"
          }}>
            <input
              placeholder='Xác nhận mật khẩu'
              type="password"
              required
            />
          </div>


          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className='btn-registerClient' style={{ marginTop: "35px" }} type="submit">Đăng ký</button>
        </form>
        <div className='mt-2 text-center'>
          Bạn đã có tài khoản? <span className='text-register' onClick={handleTextLogin}> Đăng nhập ngay</span>
        </div>
      </div >
    </>
  );
};

export default RegisterClient;
