import React, { useEffect, useState } from "react";
import { Steps, Card, Row, Col, Button, Table, message, Form, Input } from "antd";
import { ClockCircleOutlined, TagOutlined, CheckOutlined } from "@ant-design/icons";
import io from 'socket.io-client';
import "./index.css";

export default function AppointmentClient() {
  const { Step } = Steps;
  const [garages, setGarages] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedGarages, setSelectedGarages] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [form] = Form.useForm();
  const [socket, setSocket] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateFormat, setSelectedDateFormat] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  

  const timeSlots = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30"];

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);

    return {
      fullDate: date.toISOString().split('T')[0], // Trả ra định dạng YYYY-MM-DD
      day: date.getDate(),                       // Ngày
      month: date.getMonth() + 1,                // Tháng (0-based nên cần +1)
      year: date.getFullYear(),                  // Năm
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }), // Thứ trong tuần
    };
  });

  useEffect(() => {
    const socketInstance = io("http://localhost:8080", {
      transports: ['websocket', 'polling'],
      path: '/socket.io',
    });

    socketInstance.on("connect", () => {
      console.log("Connected to server:", socketInstance.id);
    });

    setSocket(socketInstance);

    const fetchGarages = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/garages/get-all");
        const data = await response.json();
        setGarages(data.data);
      } catch (error) {
        console.error("Error fetching garages:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/services/get-all");
        const data = await response.json();
        setServices(data.data.map(service => ({
          key: service.id,
          name: service.name,
          duration: `${service.duration} min`,
          price: `${service.price.toLocaleString()} VND`,
        })));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchGarages();
    fetchServices();
  }, []);

  const handleGaragesSelect = (garage) => {
    setSelectedGarages(garage);
  };

  const handleToggleSelectService = (serviceKey) => {
    if (selectedServices.includes(serviceKey)) {
      setSelectedServices(selectedServices.filter((key) => key !== serviceKey));
    } else {
      setSelectedServices([...selectedServices, serviceKey]);
    }
  };

  const handleTimeSelect = (day, time) => {
    setSelectedDate(day.fullDate); // Gán fullDate (YYYY-MM-DD)
    setSelectedTime(time); // Gán giờ đã chọn

    const value = new Date(day.fullDate + "T" + time + ":00");

    // Định dạng thành `YYYY-MM-DD HH:mm:ss`
    const formattedDateTime = value.toISOString().replace('T', ' ').slice(0, 19);
  
    // Lưu giá trị gộp
    setSelectedDateFormat(formattedDateTime);

    console.log(selectedDateFormat);
  };

  const handleConfirmBooking = async (values) => {
    if (!selectedGarages) {
      message.error("Vui lòng chọn chi nhánh!");
      return;
    }

    if (selectedServices.length === 0) {
      message.error("Vui lòng chọn dịch vụ!");
      return;
    }

    if (!selectedDate || !selectedTime) {
      message.error("Vui lòng chọn ngày và giờ!");
      return;
    }

    const customerData = {
      full_name: values.full_name,
      email: values.email,
      phone_number: values.phone_number,
      address: values.address,
    };

    try {
      const customerResponse = await fetch("http://localhost:8080/admin/customers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      const customerResult = await customerResponse.json();

      if (customerResult.code === 201) {
        const customerId = customerResult.data.id;
        const selectedServicesData = selectedServices.join(",");

        const bookingData = {
          garage_id: selectedGarages.id,
          service_id: selectedServicesData,
          customer_id: customerId,
          appointment_date: selectedDate,
          appointment_time: selectedTime,
        };

        const appointmentResponse = await fetch("http://localhost:8080/admin/appointment/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        const appointmentResult = await appointmentResponse.json();

        if (appointmentResult.code === 201) {
          message.success("Đặt lịch thành công!");
          form.resetFields();
          setSelectedGarages(null);
          setSelectedServices([]);
          setSelectedDate(null);
          setSelectedTime(null);
        } else {
          message.error("Đặt lịch không thành công. Vui lòng thử lại.");
        }
      } else {
        message.error("Tạo khách hàng không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error during booking process:", error);
      message.error("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  const columns = [
    {
      title: "Dịch Vụ",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <div>
          {text} <a style={{ color: "red" }}>Xem chi tiết</a>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "duration",
      key: "duration",
      render: (text) => (
        <div>
          <ClockCircleOutlined style={{ marginRight: "5px" }} />
          {text}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <div>
          <TagOutlined style={{ marginRight: "5px" }} />
          {text}
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => {
        const isSelected = selectedServices.includes(record.key);
        return (
          <Button
            type="primary"
            danger={isSelected}
            onClick={() => handleToggleSelectService(record.key)}
            style={{
              backgroundColor: isSelected ? "#FF4D4F" : "",
              color: isSelected ? "#fff" : "",
              borderColor: isSelected ? "#FF4D4F" : "",
            }}
            icon={isSelected ? <CheckOutlined /> : null}
          >
            {isSelected ? "Hủy" : "Chọn"}
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <img
        style={{ width: "100%" }}
        src="https://quanticalabs.com/wp_themes4/wp-content/uploads/2017/04/header_01.jpg"
        alt="Header"
      />
      <div className="all mt-5">
        <p className="mt-4">
          <b>Chào mừng bạn đến với hệ thống đặt lịch hẹn rửa xe và chăm sóc xe của AutoWash. Một số lưu ý đến bạn:</b>
        </p>
        <p>Đơn vị tính được hiểu là (x1.000đ)</p>
        <p>Nếu không có nhu cầu lựa chọn combo, bạn có thể bỏ qua bước 2 nhé!</p>

        <Form form={form} layout="vertical" onFinish={handleConfirmBooking}>
          <Steps current={0} style={{ marginBottom: "20px" }}>
            <Step title="Chọn chi nhánh" description="Select location below." />
          </Steps>

          <Row gutter={16}>
            {garages.map((garage) => (
              <Col span={6} key={garage.id}>
                <Card
                  hoverable
                  style={{
                    textAlign: "center",
                    backgroundColor: selectedGarages?.id === garage.id ? "#FF4D4F" : "#f0f0f0",
                    color: selectedGarages?.id === garage.id ? "#fff" : "#000",
                  }}
                  onClick={() => handleGaragesSelect(garage)}
                >
                  {garage.name}
                </Card>
              </Col>
            ))}
          </Row>

          <div className="mt-4">
            <Steps current={1} style={{ marginBottom: "20px" }}>
              <Step title="Bảng Dịch Vụ" description="Chọn thêm dịch vụ lẻ" />
            </Steps>

            <Table
              columns={columns}
              dataSource={services}
              pagination={false}
              bordered
              loading={services.length === 0}
            />
          </div>

          <div className="mt-4">
            <Steps current={2} style={{ marginBottom: "20px" }}>
              <Step title="Chọn thời gian" description="Click vào ngày và giờ dưới đây để đặt lịch" />
            </Steps>

            <div className="time-table">
              <Row gutter={16}>
                {days.map((day, dayIndex) => (
                  <Col key={dayIndex} span={3}>
                    <div
                      className={`day-header ${dayIndex === 0 ? 'not-available' : ''}`}
                      style={{
                        backgroundColor: dayIndex === 0 ? "#FF4D4F" : "#fff",
                        color: dayIndex === 0 ? "#fff" : "#000",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                      }}
                    >
                      <div>{day.day}</div>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "5px", fontSize: "12px", color: "#aaa" }}>
                      {day.dayOfWeek}
                    </div>

                    {dayIndex === 0 ? (
                      <div style={{ textAlign: "center", color: "gray", marginTop: "10px" }}>
                        Not available.
                      </div>
                    ) : (
                      <div className="time-slots">
                        {timeSlots.map((time, timeIndex) => (
                          <Button
                            key={timeIndex}
                            type="default"
                            block
                            style={{
                              marginBottom: "5px",
                              backgroundColor:
                                time === selectedTime && day.fullDate === selectedDate ? "#FF4D4F" : "#fff",
                              color: time === selectedTime && day.fullDate === selectedDate ? "#fff" : "#000",
                              borderColor: "#d9d9d9",
                            }}
                            onClick={() => handleTimeSelect(day, time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    )}
                  </Col>
                ))}
              </Row>
            </div>
          </div>

          <h2 className="mt-3">Thông Tin Khách Hàng</h2>
          <Form.Item name="full_name" label="Họ và Tên" rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="phone_number" label="Số Điện Thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="address" label="Địa Chỉ" rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}>
            <Input />
          </Form.Item>
          <Button
            type="primary"
            style={{ marginTop: "20px" }}
            htmlType="submit"
          >
            Xác nhận đặt lịch
          </Button>
        </Form>
      </div>
    </div>
  );
}