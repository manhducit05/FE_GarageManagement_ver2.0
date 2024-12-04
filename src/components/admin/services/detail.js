import React, { useEffect, useState } from 'react';
import { Descriptions, Button, message } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Sử dụng nếu bạn có hệ thống route

const ServiceDetail = () => {
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

  if (!service) {
    return <p>Loading service details...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Descriptions title="Service Details" bordered>
        <Descriptions.Item label="ID">{service.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{service.name}</Descriptions.Item>
        <Descriptions.Item label="Description">{service.description}</Descriptions.Item>
        <Descriptions.Item label="Price">{`$${service.price}`}</Descriptions.Item>
        <Descriptions.Item label="Created At">
          {new Date(service.created_at).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {new Date(service.updated_at).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>

      <div style={{ marginTop: '20px' }}>
        <Button type="primary" onClick={() => navigate(`/services/edit/${id}`)}>
          Edit
        </Button>
        <Button style={{ marginLeft: '10px' }} onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default ServiceDetail;
