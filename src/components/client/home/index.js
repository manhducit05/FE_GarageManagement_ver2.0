import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';
import { Button } from "antd";

import { Layout, Menu, Card, Row, Col } from "antd";
function HomeClient({ permissions, permission }) {
  const API = process.env.REACT_APP_API_URL_CLIENT;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  document.title = "Dịch vụ bảo dưỡng xe";
  useEffect(() => {



  }, []);


  // if (loading) return <div className='products__main'>Loading...</div>;
  // if (error) return <div className='products__main'>Error: {error}</div>;

  const handleProductName = (item) => {
    navigate(`/${item.slug}`)
  }

  function formatCurrency(number) {
    const numberString = number.toString();
    const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const formattedCurrency = formattedNumber + '₫';
    return formattedCurrency;
  }

  return (
    <>
      <div className="banner">
        <div className='text'>
          <h3>Trung Tâm Bảo Dưỡng Sửa Chữa Ô Tô Chuyên Nghiệp</h3>
          <p>
            Chuyên sửa chữa, bảo trì, nâng cấp các loại ô tô từ phổ thông đến
            hạng sang của các hãng xe nổi tiếng trên thế giới.
          </p>
          <div className="button-group">
            <Button type="primary" size="large">
              Đặt Hẹn
            </Button>
            <Button size="large">Liên Hệ</Button>
          </div>
        </div>
      </div>

      {/* Dịch Vụ Mới */}
      <div className="services">
        <h2 className="section-title">Dịch Vụ Mới</h2>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              cover={
                <img
                  alt="Rửa xe"
                  src="https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/unnamed-600x498.jpg"
                />
              }
            >
              <Card.Meta title="Dịch vụ rửa xe hơi ô tô" />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              cover={
                <img
                  alt="Đồng sơn"
                  src="https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/IMG2-600x498.jpg"
                />
              }
            >
              <Card.Meta title="Dịch vụ đồng sơn" />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              cover={
                <img
                  alt="Bảo dưỡng"
                  src="https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/img1-600x498.jpg"
                />
              }
            >
              <Card.Meta title="Bảo dưỡng, sửa chữa xe ô tô" />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              cover={
                <img
                  alt="Bảo hiểm"
                  src="https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/img3-600x498.jpg"
                />
              }
            >
              <Card.Meta title="Bảo hiểm ô tô" />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Tiêu Chí Hoạt Động */}
      <div className="criteria">
        <h2 className="section-title">Tiêu Chí Hoạt Động</h2>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={4}>
            <div className="criteria-item">
              <div className="icon">🕒</div>
              <p>Không để khách hàng đợi lâu</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <div className="criteria-item">
              <div className="icon">⚙️</div>
              <p>Ưu tiên sửa chữa, hạn chế thay thế</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <div className="criteria-item">
              <div className="icon">💻</div>
              <p>Đặt hẹn online</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <div className="criteria-item">
              <div className="icon">💲</div>
              <p>Cam kết đúng giá</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <div className="criteria-item">
              <div className="icon">👍</div>
              <p>Đội ngũ thợ hơn 10 năm kinh nghiệm</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <div className="criteria-item">
              <div className="icon">🛡️</div>
              <p>Bảo hành lâu dài</p>
            </div>
          </Col>
        </Row>
      </div>


    </>
  );
}

export default HomeClient;