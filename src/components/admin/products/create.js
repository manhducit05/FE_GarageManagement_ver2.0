import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import axiosToken from '../../context/axiosToken';

const API = process.env.REACT_APP_API_URL;
const AdminCreateProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log('Form values:', values);

    // Sending a POST request to create a new product
    axiosToken.post(`${API}/accounts/create`, values) // axios tự động stringify body
      .then((response) => {
        console.log('Success:', response.data); // Dữ liệu trả về từ server
        setLoading(false);
        form.resetFields(); // Reset form sau khi tạo thành công
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false); // Dừng loading khi có lỗi
      });
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Tạo tài khoản mới</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{

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
          <Input.TextArea rows={4} placeholder="Nhập email" />
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
          label="Phần trăm giảm giá"
          name="discountPercentage"
          rules={[{ required: true, message: 'Vui lòng nhập phần trăm giảm giá!' }]}
        >
          <Input type="number" placeholder="Nhập % giảm giá" />
        </Form.Item>

        <Form.Item
          label="Tồn kho"
          name="stock"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho!' }]}
        >
          <Input type="number" placeholder="Nhập số lượng tồn kho" />
        </Form.Item>

        <Form.Item
          label="Hình thu nhỏ"
          name="thumbnail"
          rules={[{ required: true, message: 'Vui lòng nhập URL hình thu nhỏ!' }]}
        >
          <Input placeholder="Nhập URL hình thu nhỏ" />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
        >
          <Input placeholder="Trạng thái sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Màu nổi bật"
          name="featured"
        >
          <Input placeholder="Nhập màu nổi bật" />
        </Form.Item>

        <Form.Item
          label="Vị trí"
          name="position"
        >
          <Input type="number" placeholder="Nhập vị trí sản phẩm" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminCreateProduct;