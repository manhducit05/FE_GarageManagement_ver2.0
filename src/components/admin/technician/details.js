import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row, message, Spin, Divider } from "antd";
import axios from "axios";

const TechnicianDetail = () => {
  const { id } = useParams(); // Nhận id từ URL
  const [technician, setTechnician] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } else {
        message.error("Unable to fetch technician details.");
      }
    } catch (error) {
      message.error("Error fetching data.");
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
    <Card
      title={`Technician Details - ${technician.full_name}`}
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Divider orientation="left">Basic Information</Divider>
        </Col>
        <Col span={12}>
          <strong>ID:</strong>
        </Col>
        <Col span={12}>{technician.id}</Col>
        <Col span={12}>
          <strong>Full Name:</strong>
        </Col>
        <Col span={12}>{technician.full_name}</Col>
        <Col span={12}>
          <strong>Email:</strong>
        </Col>
        <Col span={12}>{technician.email}</Col>
        <Col span={12}>
          <strong>Phone Number:</strong>
        </Col>
        <Col span={12}>{technician.phone_number || "N/A"}</Col>
        <Col span={12}>
          <strong>Specialty:</strong>
        </Col>
        <Col span={12}>{technician.specialty}</Col>
        <Col span={12}>
          <strong>Created At:</strong>
        </Col>
        <Col span={12}>
          {new Date(technician.created_at).toLocaleString()}
        </Col>
        <Col span={12}>
          <strong>Updated At:</strong>
        </Col>
        <Col span={12}>
          {new Date(technician.updated_at).toLocaleString()}
        </Col>
      </Row>
    </Card>
  );
};

export default TechnicianDetail;
