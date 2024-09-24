import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from './sidebar/sidebar';
import './index.css';

export default function Admin() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('mode');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []); // Chạy 1 lần khi component mount

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('mode', newTheme);
  };

  return (
    <div className={`admin-container ${theme}`}>
      <Row>
        <Col span={4}>
          <SidebarAdmin toggleTheme={toggleTheme} />
        </Col>
        <Col span={19}>
          <div className='ms-5 content-outlet'>
            <Outlet />
          </div>
        </Col>
      </Row>
    </div>
  );
}
