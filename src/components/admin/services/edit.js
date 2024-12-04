import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ServiceEdit = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate(); // Điều hướng quay lại hoặc đến trang khác
  const [service, setService] = useState(null);

  // Gọi API để lấy thông tin chi tiết dịch vụ
  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_ADMIN}/services/get-by-id/${id}`);
        if (response.data.code === 200) {
          setService(response.data.data);
        } else {
          message.error('Failed to fetch service details');
        }
      } catch (error) {
        message.error('Error fetching service details');
      }
    };
    fetchServiceDetail();
  }, [id]);

  // Xử lý khi form được submit
  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL_ADMIN}/services/edit/${id}`, {
        name: values.name,
        description: values.description,
        price: values.price,
      });

      if (response.data.code === 200) {
        message.success('Service updated successfully');
        navigate(`/admin/services/${id}`); // Quay lại trang chi tiết sau khi chỉnh sửa
      } else {
        message.error('Failed to update service');
      }
    } catch (error) {
      message.error('Error updating service');
    }
  };

  if (!service) {
    return <p>Loading service details...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Service</h2>
      <Form
        initialValues={{
          name: service.name,
          description: service.description,
          price: service.price,
        }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Service Name"
          name="name"
          rules={[{ required: true, message: 'Please input the service name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the service description!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
          <Button
            style={{ marginLeft: '10px' }}
            onClick={() => navigate(`/admin/services/${id}`)}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ServiceEdit;
