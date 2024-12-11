import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TechnicianEdit = () => {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate(); // Dùng để chuyển hướng sau khi lưu
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [technician, setTechnician] = useState(null);

  // Lấy thông tin kỹ thuật viên từ API
  useEffect(() => {
    fetchTechnicianDetail(id);
  }, [id]);

  const fetchTechnicianDetail = async (technicianId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/technicians/get-by-id/${technicianId}`
      );
      if (response.data.code === 200) {
        setTechnician(response.data.data);
        form.setFieldsValue(response.data.data); // Thiết lập giá trị của biểu mẫu
      } else {
        message.error("Unable to fetch technician details.");
      }
    } catch (error) {
      message.error("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi lưu thông tin đã chỉnh sửa
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8080/admin/technicians/${id}`,
        values
      );
      if (response.data.code === 200) {
        message.success("Technician updated successfully!");
        navigate(`/technician/${id}`); // Sau khi thành công, chuyển đến trang chi tiết
      } else {
        message.error("Failed to update technician");
      }
    } catch (error) {
      message.error("Error updating technician");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (!technician) {
    return <p>Technician not found</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Edit Technician</h2>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={technician}
        layout="vertical"
      >
        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[{ required: true, message: "Full name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email is required" }, { type: "email", message: "Invalid email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone_number"
          rules={[{ required: true, message: "Phone number is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Specialty"
          name="specialty"
          rules={[{ required: true, message: "Specialty is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TechnicianEdit;
