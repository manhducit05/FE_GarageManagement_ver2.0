import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message, Popconfirm } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Services = () => {
  const [services, setServices] = useState([]);
  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_ADMIN}/services/get-all`);
        if (response.data.code === 200) {
          setServices(response.data.data);
        } else {
          message.error('Failed to fetch services');
        }
      } catch (error) {
        message.error('Error fetching services');
      }
    };
    fetchServices();
  }, []);

  const navigate = useNavigate();
  const handleView = (id) => {
      navigate(`/admin/services/${id}`);
  };

  const handleEdit = (id) => {
      navigate(`/admin/services/edit/${id}`);
  };

  const handleDelete = async (id) => {
      try {
          // Giả lập gọi API xóa
          const API = `${process.env.REACT_APP_API_URL_ADMIN}/services/delete/${id}`
          console.log(API)
          const response = await axios.delete(API);
          if ((response.data.code === 200))
              message.success('Deleted successfully');
      } catch (error) {
          message.error('Failed to delete');
      }
  };


  // Định nghĩa các cột của bảng
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button type="link" onClick={() => handleView(record.id)}>
                    View
                </Button>
                <Button type="link" onClick={() => handleEdit(record.id)}>
                    Edit
                </Button>
                <Popconfirm
                    title="Chắc chán xóa thông tin khách hàng này?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="link" danger>
                        Delete
                    </Button>
                </Popconfirm>
            </Space>
        ),
    }
  ];


  return <Table columns={columns} dataSource={services} rowKey="id" />;
};

export default Services;
