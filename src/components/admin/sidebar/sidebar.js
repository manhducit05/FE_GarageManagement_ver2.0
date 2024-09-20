import React, { useEffect, useState } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import {
  UnorderedListOutlined,
  InsertRowBelowOutlined,
  InsertRowAboveOutlined
} from "@ant-design/icons"

export default function SidebarAdmin() {
  const navigate = useNavigate([])

  const handleMenuClick = (e) => {
    if (e.key === 'profile') {
    } else if (e.key === 'settings') {
    } else if (e.key === 'logout') {
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">Thông tin cá nhân</Menu.Item>
      <Menu.Item key="settings">Cài đặt</Menu.Item>
      <Menu.Item key="logout">Đăng xuất</Menu.Item>
    </Menu>
  );

  const items = [
    {
      label: <Link to="/admin/"></Link>,
      icon: <InsertRowAboveOutlined />,
      key: "/admin/",
    },
    {
      label: <Link to="/admin/products">Sản phẩm</Link>,
      icon: <InsertRowBelowOutlined />,
      key: "/admin/products"

    }, {
      label: <Link to="/admin/roles">Nhóm quyền</Link>,
      icon: <InsertRowAboveOutlined />,
      key: "/admin/roles",
    }, {
      label: <Link to="/admin/accounts">Tài khoản</Link>,
      icon: <InsertRowAboveOutlined />,
      key: "/admin/accounts",
    },
  ];

  return (
    <div >
      <div className='accountAdmin__info'>
        <Dropdown overlay={menu} trigger={['click']}>
          <Avatar>

          </Avatar>
        </Dropdown>
      </div>
      <div className='menuHome'>
        <Menu theme="light" mode="inline" items={items} defaultSelectedKeys={["/"]} defaultOpenKeys={["menu-1"]} />
      </div>
    </div >
  );
}