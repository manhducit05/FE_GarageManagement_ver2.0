import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import "./layout.css";

export default function SidebarClient() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className='Layout'>
      {/* Header */}
      <div className={`header d-flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="logo">
          <img src='https://autowash.vn/wp-content/uploads/2019/03/autowash-02-e1587810991846.png' alt="Logo" />
        </div>
        <div className='nav'>
          <ul className="nav">
            <li className="nav-item">
              <div className="nav-link active" aria-current="page" onClick={()=>{navigate("/")}}>Trang chủ</div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={()=>{navigate("/services")}}>Dịch vụ</div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={()=>{navigate("/dat-lich-rua-xe")}}>Đặt Lịch Chăm Sóc Xe</div>
            </li>

            <li className="nav-item">
              <div className="nav-link" aria-disabled="true" onClick={()=>{navigate("/news")}}>Tin Tức</div>
            </li>
            <li className="nav-item">
              <div className="nav-link" aria-disabled="true" onClick={()=>{navigate("/contact")}}>Liên Hệ</div>
            </li>
          </ul>
        </div>

        <div className="contact-info">
          <span>Thứ 2 - Thứ 6 (9h - 18h)</span>
          <br />
          <span>Gọi ngay: 076 922 0162</span>
        </div>
      </div>

      {/* Content */}
      <Outlet />

      {/* Footer */}
      <div className='Footer text-center'>
        <div className='icon d-flex justify-content-center'>
        <i class="fa-brands fa-facebook"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-square-threads"></i>
        <i class="fa-brands fa-google-plus-g"></i>
        <i class="fa-brands fa-threads"></i>
        </div>
        <div className='title'>
          By AutoWash © 2022 Auto Wash - Hệ Thống Rửa Xe Và Chăm Sóc Xe Chuyên Nghiệp
        </div>
      </div>
    </div>
  );
}
