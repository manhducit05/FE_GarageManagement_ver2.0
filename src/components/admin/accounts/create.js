import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import axiosToken from '../../context/axiosToken';

const API = process.env.REACT_APP_API_URL;

const AdminCreateAccount = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    folder: 'Sale-bear-images/admin/avatar',
    thumbnail: null
  });

  const onFinish = (values) => {
    setLoading(true);

    // Creating FormData object to handle file and text data
    values.thumbnail = formData.thumbnail;
    values.folder = formData.folder;

    axiosToken.post(`${API}/accounts/create`, values, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        console.log('Success:', response.data); // Dữ liệu trả về từ server
        setLoading(false);
        form.resetFields(); // Reset form after success
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false); // Stop loading on error
      });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, thumbnail: e.target.files[0] }); // Set file in formData
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Tạo tài khoản mới</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: 'active',
          featured: 'Màu xám',
          position: 1
        }}
      >
        <Form.Item
          label="Họ tên người dùng"
          name="fullName"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          <Input placeholder="Nhập họ tên" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
        >
          <Input type="password" placeholder="Nhập password" />
        </Form.Item>

        <Form.Item
          label="Xác nhận password"
          name="passwordConfirm"
          rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
        >
          <Input type="password" placeholder="Nhập xác nhận password" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input type="number" placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          label="Avatar"
          name="thumbnail"
          rules={[{ required: true, message: 'Vui lòng chọn file!' }]}
        >
          <input type="file" name="thumbnail" onChange={handleFileChange} required />
        </Form.Item>

        <Form.Item
          label="Quyền"
          name="role_id"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          <Input placeholder="Nhập quyền" />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
        >
          <Input placeholder="Trạng thái sản phẩm" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo tài khoản
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminCreateAccount;
