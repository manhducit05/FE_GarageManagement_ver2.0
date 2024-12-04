import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerEdit = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/customers/get-by-id/${id}`);
        if (response.data.code === 200) {
          form.setFieldsValue(response.data.data);
          message.success('Customer data loaded successfully!');
        } else {
          message.error('Failed to load customer data');
        }
      } catch (error) {
        message.error('Error fetching customer data');
      }
      setLoading(false);
    };

    fetchCustomer();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      const response = await axios.put(`http://localhost:8080/admin/customers/edit/${id}`, values);
      if (response.data.code === 200) {
        message.success('Customer updated successfully!');
        navigate(-1); // Quay lại trang trước đó
      } else {
        message.error('Failed to update customer');
      }
    } catch (error) {
      message.error('Error updating customer');
    }
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        Back
      </Button>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ full_name: '', email: '', phone_number: '', address: '' }}
      >
        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[{ required: true, message: 'Please input the full name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input the email!' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone_number"
          rules={[{ required: true, message: 'Please input the phone number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CustomerEdit;
