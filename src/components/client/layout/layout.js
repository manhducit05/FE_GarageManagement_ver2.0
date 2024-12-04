import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import "./layout.css";
import { Layout, Menu, Button } from "antd";

const { Header, Content, Footer } = Layout;
export default function SidebarClient() {
  const API = process.env.REACT_APP_API_URL_CLIENT;

  const navigate = useNavigate();
  return (
    <>
        <Layout>
      {/* Header */}
      <Header className="header">
        <div className="logo">
          <h1>Mona Media Cars</h1>
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" onClick={()=>{navigate("/")}}>Trang Chủ</Menu.Item>
          <Menu.Item key="2" onClick={()=>{navigate("/introduce")}}>Giới Thiệu</Menu.Item>
          <Menu.Item key="3" onClick={()=>{navigate("/services")}}>Dịch Vụ</Menu.Item>
          <Menu.Item key="4" onClick={()=>{navigate("/news")}}>Tin Tức</Menu.Item>
          <Menu.Item key="5" onClick={()=>{navigate("/contact")}}>Liên Hệ</Menu.Item>
        </Menu>
        <div className="contact-info">
          <span>Thứ 2 - Thứ 6 (9h - 18h)</span>
          <br/>
          <span>Gọi ngay: 076 922 0162</span>
        </div>
      </Header>
      {/* Content */}
          <Outlet/>
      {/* Footer */}
      <Footer style={{ textAlign: "center", backgroundColor:"black", color:"white" }}>
        ©2024 Mona Media Cars. All rights reserved.
      </Footer>
    </Layout>
    </>
  );
}
