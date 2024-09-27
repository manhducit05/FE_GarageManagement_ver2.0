import React, { useEffect, useState } from 'react';
import { Avatar, Menu, Dropdown, Button, Switch, } from 'antd';

import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  UsergroupAddOutlined,
  InsertRowBelowOutlined,
  UserSwitchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons"

import Cookies from 'js-cookie'; // Thư viện để lưu token vào cookies
import axiosToken from '../../context/axiosToken';
import "./sidebar.css"

export default function SidebarAdmin({ toggleTheme }) {
  const location = useLocation();
  const API = process.env.REACT_APP_API_URL;
  const [account, setAccount] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  var storedTheme = localStorage.getItem('mode');

  const [theme, setTheme] = useState(storedTheme);
  const [collapsed, setCollapsed] = useState(false);

  localStorage.setItem('mode', theme)

  const changeTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light')
    toggleTheme(checked ? 'dark' : 'light');
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    console.log("collapsed", collapsed)
  };


  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await axiosToken.get(`${API}/accounts/verify`);
        console.log(res)

        if (res.data.account.permissions != []) {
          setPermissions(res.data.account.permissions);
          console.log(res.data.account.permissions)
          localStorage.setItem('permissions', JSON.stringify(res.data.account.permissions));
        }

        if (res.data.account != []) {
          setAccount(res.data.account);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [API]);

  const navigate = useNavigate([])

  const handleMenuClick = (e) => {
    if (e.key === 'profile') {
    } else if (e.key === 'settings') {
    } else if (e.key === 'logout') {
    }
  };

  const handleLogout = () => {
    Cookies.remove("token")
    navigate("/admin/login")
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">Thông tin cá nhân</Menu.Item>
      <Menu.Item key="settings">Cài đặt</Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>Đăng xuất</Menu.Item>
    </Menu>
  );

  const items = [];

  // Check permissions and add items to array
  if (permissions.includes("products_view")) {
    items.push({
      label: (
        <Link to="/admin/products">
          <span className={`textMenu ${location.pathname === '/admin/products' ? 'active' : ''}`}>
            Sản phẩm
          </span>
        </Link>
      ),
      icon: (
        <InsertRowBelowOutlined
          className={`custom-icon ${location.pathname === '/admin/products' ? 'active' : ''}`}
        />
      ),
      key: "/admin/products",
    });
  }

  // Other items
  if (permissions.includes("roles_view")) {
    items.push({
      label: (
        <Link to="/admin/roles">
          <span className={`textMenu ${location.pathname === '/admin/roles' ? 'active' : ''}`}>
            Nhóm quyền
          </span>
        </Link>
      ),
      icon: (
        <UserSwitchOutlined
          className={`custom-icon ${location.pathname === '/admin/roles' ? 'active' : ''}`}
        />
      ),
      key: "/admin/roles",
    },
    );
  }

  if (permissions.includes("roles_permissions")) {
    items.push({
      label: (
        <Link to="/admin/permissions">
          <span className={`textMenu ${location.pathname === '/admin/permissions' ? 'active' : ''}`}>
            Phân quyền
          </span>
        </Link>
      ),
      icon: (
        <UserSwitchOutlined
          className={`custom-icon ${location.pathname === '/admin/permissions' ? 'active' : ''}`}
        />
      ),
      key: "/admin/permissions",
    },
    );
  }


  if (permissions.includes("accounts_view")) {
    items.push({
      label: (
        <Link to="/admin/accounts">
          <span className={`textMenu ${location.pathname === '/admin/accounts' ? 'active' : ''}`}>
            Tài khoản
          </span>
        </Link>
      ),
      icon: (
        <UsergroupAddOutlined
          className={`custom-icon ${location.pathname === '/admin/accounts' ? 'active' : ''}`}
        />
      ),
      key: "/admin/accounts",
    });
  }

  return (
    <div >
      <div className={`menuHome ${(theme === "dark") ? "dark" : "light"} ${(collapsed ? "collapsed" : "")}`}>
        {/* Avatar Section */}
        <div className="avatar-container">
          <Dropdown className='drop-avt' overlay={menu} trigger={['click']}>
            <span>
              <Avatar
                size={50}
                src={account.avatar ? account.avatar : null}
              >
                {!account.avatar && account.name?.charAt(0).toUpperCase()}
              </Avatar>
            </span>
          </Dropdown>
        </div>

        {/* Collapse Button */}
        <Button
          className='btn-collapse'
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>

        {/* Menu Items */}
        <Switch
          checked={theme === 'dark'}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
          className='btnDarkLight'
        />
        <Menu
          theme={theme}
          inlineCollapsed={collapsed}
          mode="inline"
          items={items}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["menu-1"]}
        />
      </div>

    </div >
  );
}