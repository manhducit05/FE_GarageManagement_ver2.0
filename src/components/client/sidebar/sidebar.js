import React, { useState } from 'react';
import { Menu, Switch } from 'antd';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import "./sidebar.css";

export default function SidebarClient({ toggleTheme }) {
  const location = useLocation();
  const storedTheme = localStorage.getItem('mode');
  const [theme, setTheme] = useState(storedTheme);
  const navigate = useNavigate();

  localStorage.setItem('mode', theme);

  const changeTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light');
    toggleTheme(checked ? 'dark' : 'light');
  };

  const items = []
  items.push(
    {
      label: (
        <Link to="/admin/products-category">
          <span className={`textMenu ${location.pathname === '/admin/products-category' ? 'active' : ''}`}>
            Danh mục sản phẩm
          </span>
        </Link>
      ),
      key: "/admin/products-category",
    },
  )

  items.push(
    {
      label: (
        <Link to="/admin/products-category">
          <span className={`textMenu ${location.pathname === '/admin/products-category' ? 'active' : ''}`}>
            Danh mục sản phẩm
          </span>
        </Link>
      ),
      key: "/admin/products-category",
    },
  )

  return (
    <div className="menu-container">
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
        className='btnDarkLightClient'
      />

      <Menu
        theme={theme}
        mode="horizontal"
        items={items}
        defaultSelectedKeys={[location.pathname]}
      />
    </div>
  );
}
