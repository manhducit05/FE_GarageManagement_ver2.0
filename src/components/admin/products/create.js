import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';

const API = process.env.REACT_APP_API_URL;
const AdminCreateProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log('Form values:', values);

    // Sending a POST request to create a new product
    fetch(`${API}/products/create`, {
      method: 'POST', // Specify the HTTP method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values), // Pass form data as the request body
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setLoading(false);
        form.resetFields(); // Reset form after successful creation
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false); // Stop loading in case of an error
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Tạo sản phẩm mới</h2>
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
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
        >
          <Input placeholder="Nhập tiêu đề sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
        >
          <Input type="number" placeholder="Nhập giá sản phẩm" />
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