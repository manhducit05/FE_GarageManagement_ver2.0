import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import './contact.css'


const ContactSection = () => {
  return (
    <>
      <div className='box-news'>
        <div className='bg'>
          <div className='p1'>LIÊN HỆ</div>
        </div>
      </div>
      <div className='box-contact'>
        <div className='row'>
          <div className='col-4'>
            <div className='d-flex'>
              <i class="fa-solid fa-phone"></i>
              <div className='txt'>
                <div className='title'>
                  Gọi Ngay Hotline
                </div>
                <div className='phone'>
                  (+84) 0988579068
                  <br />
                  (+84) 0939051094
                </div>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='d-flex'>
              <i class="fa-regular fa-map"></i>
              <div className='txt'>
                <div className='title'>Địa Chỉ</div>
                <br />
                <b>Chi nhánh 1:</b> 95 Lê Thị Chợ, phường Phú Thuận, Quận 7, TPHCM
                <br />

                <b>Chi nhánh 2:</b> 87 Bờ Bao Tân Thắng, phường Sơn Kỳ, Quận Tân Phú, TPHCM
                <br />


                <b>Chi nhánh 3:</b> 77 Đỗ Xuân Hợp, phường Phước Long B, Quận 9, TPHCM
                <br />


                <b>Chi nhánh 4:</b> 84 Cù Lao, phường 2, Quận Phú Nhuận, TPHCM
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='d-flex'>
              <i class="fa-solid fa-clock"></i>
              <div className='txt'>
                <div className='title'>
                  Thời Gian Làm Việc
                </div>
                <br />
                Thứ Hai – Chủ Nhật: 7:00 – 18:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default ContactSection;
