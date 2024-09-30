import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { Outlet } from 'react-router-dom';
import './index.css';
import SidebarClient from './sidebar/sidebar';

export default function Client() {
  var storedTheme = localStorage.getItem('mode');
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    storedTheme = localStorage.getItem('mode');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [theme]); // Chạy 1 lần khi component mount

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('mode', newTheme);
  };

  return (
    <div className={`client-container ${theme}`}>
      <SidebarClient toggleTheme={toggleTheme} />
      <div className='content-outlet-client'>
        <Outlet />
      </div>
    </div>
  );
}
