import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Space, message, Popconfirm } from 'antd';
import axios from 'axios';

const Customer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleView = (id) => {
        navigate(`/admin/customers/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/admin/customers/edit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            // Giả lập gọi API xóa
            const API = `${process.env.REACT_APP_API_URL_ADMIN}/customers/delete/${id}`
            console.log(API)
            const response = await axios.delete(API);
            if ((response.data.code === 200))
                message.success('Deleted successfully');
        } catch (error) {
            message.error('Failed to delete');
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/admin/customers/get-all');
                if (response.data.code === 200) {
                    setData(response.data.data);
                    message.success(response.data.message);
                } else {
                    message.error('Failed to fetch data');
                }
            } catch (error) {
                message.error('Error fetching data');
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (text) => new Date(text).toLocaleString(),
        },
        ,
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

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 5 }}
        />
    );
};

export default Customer;
