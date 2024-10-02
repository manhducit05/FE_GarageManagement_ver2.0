import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Space } from 'antd';
import "./register.css";

const RegisterClient = () => {
  const API = process.env.REACT_APP_API_URL_CLIENT;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const handleTextLogin = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccessAlert(true);
        setLoading(false);
        // Optionally redirect or reset the form
      }
      const errorData = await response.json();
      if (response.status === 400) {
        setError("Email already exists!");
      } else if (response.status === 401) {
        setError("Username already exists!");
      } else {
        setError(errorData.message || 'Registration failed');
      }
      setShowErrorAlert(true);
      setLoading(false);

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
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className='mt-3' style={{ position: "relative" }}>
          <input
            placeholder='Email'
            type="email"
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className='mt-3' style={{ position: "relative" }}>
          <input
            placeholder='Số điện thoại'
            type="text"
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className='mt-3' style={{ position: "relative" }}>
          <input
            placeholder='Tên đăng nhập'
            type="text"
            name='username'
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className='mt-3' style={{ position: "relative" }}>
          <input
            placeholder='Mật khẩu'
            type="password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className='mt-3' style={{ position: "relative" }}>
          <input
            placeholder='Xác nhận mật khẩu'
            type="password"
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Space direction="vertical" style={{ position: "absolute", width: '240px', left: "39%", top: "50px" }}>
            {showErrorAlert && (
              <Badge key={"red"} color={"red"} text={<span style={{ color: "white" }}>{error}</span>} />
            )}
          </Space>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
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
