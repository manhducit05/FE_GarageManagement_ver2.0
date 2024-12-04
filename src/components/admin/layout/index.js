import React from 'react';
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./layout.css"; // CSS tùy chỉnh

const { Header, Content, Footer, Sider } = Layout;

export default function SidebarClient() {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Navbar dọc bên trái */}
      <Sider theme="dark">
        <div className="logo">
          <h1 style={{ color: "white", padding: "20px", textAlign: "center" }}>Mona Media</h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" onClick={() => navigate("/admin/dashboard")}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" onClick={() => navigate("#")}>
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

      {/* Phần nội dung */}
      <Layout>
        {/* Header */}

        {/* Nội dung chính */}
        <Content style={{ margin: "20px", padding: "20px", background: "#fff" }}>
          <Outlet />
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center", backgroundColor: "black", color: "white" }}>
          ©2024 Mona Media Cars. All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
}
