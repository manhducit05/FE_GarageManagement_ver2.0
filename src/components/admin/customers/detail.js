import React, { useEffect, useState } from 'react';
import { Descriptions, Button, message, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/customers/get-by-id/${id}`);
        if (response.data.code === 200) {
          setCustomer(response.data.data);
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
  }, [id]);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        Back
      </Button>
      {customer ? (
        <Descriptions title="Customer Details" bordered column={1}>
          <Descriptions.Item label="ID">{customer.id}</Descriptions.Item>
          <Descriptions.Item label="Full Name">{customer.full_name}</Descriptions.Item>
          <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">{customer.phone_number}</Descriptions.Item>
          <Descriptions.Item label="Address">{customer.address}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {new Date(customer.created_at).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {new Date(customer.updated_at).toLocaleString()}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <p>No customer data found.</p>
      )}
    </div>
  );
};

export default CustomerDetail;
