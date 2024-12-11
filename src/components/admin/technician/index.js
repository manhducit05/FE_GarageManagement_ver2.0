import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Popconfirm } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Technician = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const fetchTechnicians = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/admin/technicians/get-all");
      if (response.data.code === 200) {
        setData(response.data.data);
      } else {
        message.error("Failed to fetch data");
      }
    } catch (error) {
      message.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin/technicians/${id}`)
  };

  const handleEdit = (id) => {
    navigate(`/admin/technicians/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
        // Giả lập gọi API xóa
        const API = `${process.env.REACT_APP_API_URL_ADMIN}/technicians/delete/${id}`
        console.log(API)
        const response = await axios.delete(API);
        if ((response.data.code === 200))
            message.success('Deleted successfully');
    } catch (error) {
        message.error('Failed to delete');
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleView(record.id)}>
            View
          </Button>
          <Button type="link" onClick={() => handleEdit(record.id)}>
            Edit
          </Button>
          <Popconfirm
                    title="Chắc chán xóa thông tin kỹ thuật viên này?"
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
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      bordered
    />
  );
};

export default Technician;
