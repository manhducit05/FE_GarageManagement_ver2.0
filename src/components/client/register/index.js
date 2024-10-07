import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Space } from 'antd';
import "./register.css";

const RegisterClient = () => {
  const API = process.env.REACT_APP_API_URL_CLIENT;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const handleTextLogin = () => {
    navigate("/login");
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Lấy dữ liệu từ form
    const formData = new FormData(e.target);

    // Chuyển FormData thành một đối tượng JavaScript
    const formObject = Object.fromEntries(formData.entries());

    // Tách mật khẩu và xác nhận mật khẩu
    const { password, confirmPassword } = formObject;

    // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp hay không
    if (password !== confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu phải trùng nhau');
      setShowErrorAlert(true);
      setLoading(false);
      setShowSuccessAlert(false)
      return;
    }

    try {
      const response = await fetch(`${API}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject), // Gửi dữ liệu form dưới dạng JSON
      });

      const res = await response.json();

      if (res.code === 200) {
        setShowSuccessAlert(true);
        setLoading(false);
        setShowErrorAlert(false);
      } else if (res.code === 400) {
        setError("Email already exists!");
        setShowSuccessAlert(false);
        setShowErrorAlert(true);
        setLoading(false);
      } else if (res.code === 401) {
        setError("Username already exists!");
        setShowSuccessAlert(false);
        setShowErrorAlert(true);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred');
      setShowErrorAlert(true);
      setLoading(false);
    }
  };


  return (
    <div className="register-box-client">
      <h3>Đăng ký</h3>
      <form onSubmit={onSubmit} className='mt-3 form-register' id='form-register'>
        <div>
          <input
            placeholder='Họ tên'
            type="text"
            name='fullName'
            required
          />
        </div>

        <div className='mt-3' style={{ position: "relative" }}>
          <input
            placeholder='Email'
            type="email"
            name='email'
            required
          />
        </div>

        <div className='mt-3' style={{ position: "relative" }}>
          <input
            placeholder='Số điện thoại'
            type="text"
            name='phone'
            required
          />
        </div>

        <div className='mt-3' style={{ position: "relative" }}>
          <input
            placeholder='Tên đăng nhập'
            type="text"
            name='username'
            required
          />
        </div>

        <div className='mt-3' style={{ position: "relative" }}>
          <input
            placeholder='Mật khẩu'
            type="password"
            name='password'
            required
          />
        </div>

        <div className='mt-3' style={{ position: "relative" }}>
          <input
            placeholder='Xác nhận mật khẩu'
            type="password"
            name='confirmPassword'
            required
          />
          <Space direction="vertical" style={{ position: "absolute", width: '240px', left: "39%", top: "50px" }}>
            {showSuccessAlert && (
              <Badge key={"green"} color={"green"} text={<span style={{}}>Tạo tài khoản thành công!</span>} />
            )}
          </Space>
          <Space direction="vertical" style={{ position: "absolute", width: '350px', left: "38%", top: "50px" }}>
            {showErrorAlert && (
              <Badge key={"red"} color={"red"} text={<span style={{ color: "red" }}>{error}</span>} />
            )}
          </Space>
        </div>

        <button className='btn-registerClient' style={{ marginTop: "35px" }} type="submit" disabled={loading}>
          Đăng ký
        </button>
      </form>
      <div className='mt-2 text-center'>
        Bạn đã có tài khoản? <span className='text-register' onClick={handleTextLogin}> Đăng nhập ngay</span>
      </div>
    </div>
  );
};

export default RegisterClient;
