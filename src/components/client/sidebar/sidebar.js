import React, { useState, useEffect } from 'react';
import { Button, Menu, Switch, TreeSelect } from 'antd';
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
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState(storedTheme);
  const navigate = useNavigate();

  localStorage.setItem('mode', theme);

  useEffect(() => {
    const fetchProductsCategory = async () => {
      try {
        const res = await fetch(`${API}/products-category`);
        const json = await res.json();

        console.log('json: ', json)
        if (json.categories != []) {
          setProductsCategory(json.categories);
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

  const handleLogin = () => {
    navigate("/login")
  }

  const generateTreeData = (productsCategory) => {
    return productsCategory.map(category => ({
      title: category.title, // This is used for the display in TreeSelect
      value: category._id,
      children: category.children ? generateTreeData(category.children) : []
    }));
  };

  const onChange = (newValue) => {
    console.log('newValue: ', newValue);
    setValue(newValue);
  };


  const generateMenuItems = () => {
    const pushChild = (id) => {
      return productsCategory
        .filter(category => category.parent_id === id) // Lọc các category con
        .map(childCategory => {
          const grandChildren = pushChild(childCategory._id);

          // Nếu category con có children
          if (grandChildren.length > 0) {
            return {
              key: `/category/${childCategory.slug}`,
              children: grandChildren, // Thêm các item con vào đây
              label: (
                <div> {/* Thêm div bao bọc label */}
                  <span className={``}>
                    <Link to={`/category/${childCategory.slug}`}>
                      {childCategory.title}
                    </Link>
                  </span>
                </div>
              ),
            };
          } else {
            // Nếu không có grandchildren, tạo item bình thường
            return {
              label: (
                <Link to={`/category/${childCategory.slug}`}>
                  <span className={`textMenu ${location.pathname === `/category/${childCategory.slug}` ? 'active' : ''}`}>
                    {childCategory.title}
                  </span>
                </Link>
              ),
              key: `/category/${childCategory.slug}`,
            };
          }
        });
    };

    return productsCategory
      .filter(category => category.parent_id === "") // Lọc các category cấp 1
      .map(parentCategory => {
        const children = pushChild(parentCategory._id); // Lấy children cho category cha

        // Nếu category có children, tạo SubMenu
        if (children.length > 0) {
          return {
            label: (
              <span className={``}> {/* Thêm class textMenu cho parent */}
                <Link to={`/category/${parentCategory.slug}`}>
                  {parentCategory.title}
                </Link>
              </span>
            ),
            key: `/category/${parentCategory.slug}`,
            children: children, // Thêm các item con vào đây
          };
        } else {
          // Nếu không có children, tạo item bình thường
          return {
            label: (
              <Link to={`/category/${parentCategory.slug}`}>
                <span className={`textMenu ${location.pathname === `/category/${parentCategory.slug}` ? 'active' : ''}`}>
                  {parentCategory.title}
                </span>
              </Link>
            ),
            key: `/category/${parentCategory.slug}`,
          };
        }
      });
  };

  const items = [
    {
      label: (
        <Link to="/">
          <span className={`textMenu ${location.pathname === '/' ? 'active' : ''}`}>
            Trang chủ
          </span>
        </Link>
      ),
      key: "/",
    },
    ...generateMenuItems() // Kết hợp các item từ generateMenuItems
  ];


  return (
    <div className={`menu-container ${(theme === "dark") ? "dark" : "light"}`}>
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
        className='btnDarkLightClient'
      />
      <div >
        <Menu
          theme={theme}
          mode="horizontal"
           className='menuClient'
          items={items} // Generate the menu items dynamically
          defaultSelectedKeys={[location.pathname]}
        />
      </div>

      <Button className='btn-loginClient' onClick={() => navigate("/login")}>
        Đăng nhập
      </Button>
    </div>
  );
}
