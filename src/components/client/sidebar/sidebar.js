import React, { useState, useEffect } from 'react';
import { Button, Menu, Switch } from 'antd';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import "./sidebar.css";

export default function SidebarClient({ toggleTheme }) {
  const API = process.env.REACT_APP_API_URL_CLIENT;
  const location = useLocation();
  const [productsCategory, setProductsCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedTheme = localStorage.getItem('mode');
  const [theme, setTheme] = useState(storedTheme);
  const navigate = useNavigate();

  localStorage.setItem('mode', theme);

  useEffect(() => {
    const fetchProductsCategory = async () => {
      try {
        const res = await fetch(`${API}/products-category`);

        console.log(res.data)
        if (res.data.categories) {
          setProductsCategory(res.data.categories);
          console.log('categories: ', productsCategory)
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsCategory();
  }, [API]);

  const changeTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light');
    toggleTheme(checked ? 'dark' : 'light');
  };

  const items = []
  items.push(
    {
      label: (
        <Link to="/">
          <span className={`textMenu ${location.pathname === '/' ? 'active' : ''}`}>
            Trang chủ
          </span>
        </Link>
      ),
      key: "/admin/products-category",
    },
  )

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <div className={`menu-container ${(theme === "dark") ? "dark" : "light"}`} >
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

      <Button className='btn-loginClient' onClick={handleLogin}>
        Đăng nhập
      </Button>
    </div >
  );
}
