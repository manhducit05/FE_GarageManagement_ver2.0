import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Layout, Menu, Dropdown, Badge, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import axios from 'axios';
import "./layout.css"; // Custom CSS

const { Header, Content, Footer, Sider } = Layout;

export default function SidebarClient() {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; // Your API base URL
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications from API on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/notification/get-all`);
        const data = response.data.data;
        console.log(data)
        // Ensure 'notifications' is an array before setting state
        const notifications = Array.isArray(data.notifications) ? data.notifications : [];
        setNotifications(data);
        setUnreadCount(notifications.filter(notification => !notification.read).length); // Calculate unread count
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [API_URL]);

  const handleNotificationClick = (notification) => {
    // Mark the notification as read when clicked (optional API call or update state locally)
    setUnreadCount(unreadCount - 1); // Decrease unread count
    // Optional: Update notification read status in backend, if needed
  };

  const handleMarkAllAsRead = () => {
    setUnreadCount(0);  // Mark all as read (reset unread count)
    // Optional: Make an API call to update all notifications as read on the backend
  };

  const menuNotifications = (
    <Menu>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <Menu.Item key={index} onClick={() => handleNotificationClick(notification)}>
            <span dangerouslySetInnerHTML={{ __html: notification.message }} />
          </Menu.Item>
        ))
      ) : (
        <Menu.Item>
          <span>Không có thông báo mới</span>
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item onClick={handleMarkAllAsRead}>
        Đánh dấu tất cả đã đọc
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Left Navbar */}
      <Sider theme="dark">
        <div className="logo">
          <h1 style={{ color: "white", padding: "20px", textAlign: "center", paddingBottom: "0" }}>Mona Media</h1>
        </div>

        <div className="notification-icon mb-2">
          <Dropdown overlay={menuNotifications} trigger={['click']} className="notification-dropdown">
            <Badge count={unreadCount} offset={[10, 0]}>
              <BellOutlined style={{ fontSize: '24px', color: '#fff', cursor: 'pointer', position: "relative",
                left: "150px"
               }} />
            </Badge>
          </Dropdown>
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" onClick={() => navigate("/admin/dashboard")}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" onClick={() => navigate("/admin/technicians")}>
            Kỹ thuật viên
          </Menu.Item>
          <Menu.Item key="3" onClick={() => navigate("/admin/services")}>
            Dịch Vụ
          </Menu.Item>
          <Menu.Item key="4" onClick={() => navigate("/admin/customers")}>
            Khách hàng
          </Menu.Item>
          <Menu.Item key="5" onClick={() => navigate("#")}>
            Lịch hẹn
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Content */}
      <Layout>
        {/* Header */}

        {/* Main Content */}
        <Content style={{ margin: "20px", padding: "20px", background: "#fff" }}>
          <Outlet />
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center", backgroundColor: "black", color: "white" }}>
          ©2024 Mona Media Cars. All rights reserved.
        </Footer>
      </Layout>

      {/* Notification Icon */}
      
    </Layout>
  );
}
