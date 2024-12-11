import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import './news.css'
const { Title, Paragraph } = Typography;

const newsData = 
  
    [
      {
        date: '24',
        month: 'Th1',
        title: 'Những mẹo lái ô tô an toàn cơ bản',
        description: 'Sắp xếp thời gian, không phân tâm, sử dụng GPS, là những thói quen...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/9_Khong_ngu_ngat_khi_lai_1-300x200.jpg',
      },
      {
        date: '24',
        month: 'Th1',
        title: 'Thử nghiệm và đánh giá Toyota Land Cruiser 2018',
        description: 'Toyota Land Cruiser 2018 có khả năng off-road tốt và độ tin cậy cao...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/LND_MY16_0037_V001-300x169.jpg',
      },
      {
        date: '24',
        month: 'Th1',
        title: 'Những điều cần lưu ý khi mua xe đã qua sử dụng',
        description: 'Việc mua lại ô tô cũ để tiết kiệm chi phí không còn quá xa lạ...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/1_Nhung_dieu_can_biet_khi_mua_mot_chiec_o_to_cu-300x177.jpg',
      },
      {
        date: '24',
        month: 'Th1',
        title: 'Những mẫu xe cỡ nhỏ mới đáng mua nhất 2019',
        description: 'Ford Focus, Mazda 3, Honda Civic và Chevrolet Bolt phiên bản 2018 đều...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/e08132c2671df92d5c8d7ce0d95f9ef2-300x164.png',
      },
      {
        date: '24',
        month: 'Th1',
        title: 'Những mẹo lái ô tô an toàn cơ bản',
        description: 'Sắp xếp thời gian, không phân tâm, sử dụng GPS, là những thói quen...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/9_Khong_ngu_ngat_khi_lai_1-300x200.jpg',
      },
      {
        date: '24',
        month: 'Th1',
        title: 'Thử nghiệm và đánh giá Toyota Land Cruiser 2018',
        description: 'Toyota Land Cruiser 2018 có khả năng off-road tốt và độ tin cậy cao...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/LND_MY16_0037_V001-300x169.jpg',
      },
      {
        date: '24',
        month: 'Th1',
        title: 'Những điều cần lưu ý khi mua xe đã qua sử dụng',
        description: 'Việc mua lại ô tô cũ để tiết kiệm chi phí không còn quá xa lạ...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/1_Nhung_dieu_can_biet_khi_mua_mot_chiec_o_to_cu-300x177.jpg',
      },
      {
        date: '24',
        month: 'Th1',
        title: 'Những mẫu xe cỡ nhỏ mới đáng mua nhất 2019',
        description: 'Ford Focus, Mazda 3, Honda Civic và Chevrolet Bolt phiên bản 2018 đều...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/e08132c2671df92d5c8d7ce0d95f9ef2-300x164.png',
      },
      {
        date: '24',
        month: 'Th1',
        title: 'Những mẹo lái ô tô an toàn cơ bản',
        description: 'Sắp xếp thời gian, không phân tâm, sử dụng GPS, là những thói quen...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/9_Khong_ngu_ngat_khi_lai_1-300x200.jpg',
      },
      {
        date: '24',
        month: 'Th1',
        title: 'Thử nghiệm và đánh giá Toyota Land Cruiser 2018',
        description: 'Toyota Land Cruiser 2018 có khả năng off-road tốt và độ tin cậy cao...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/LND_MY16_0037_V001-300x169.jpg',
      },
      {
        date: '24',
        month: 'Th1',
        title: 'Những điều cần lưu ý khi mua xe đã qua sử dụng',
        description: 'Việc mua lại ô tô cũ để tiết kiệm chi phí không còn quá xa lạ...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/1_Nhung_dieu_can_biet_khi_mua_mot_chiec_o_to_cu-300x177.jpg',
      },
      {
        date: '24',
        month: 'Th1',
        title: 'Những mẫu xe cỡ nhỏ mới đáng mua nhất 2019',
        description: 'Ford Focus, Mazda 3, Honda Civic và Chevrolet Bolt phiên bản 2018 đều...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/e08132c2671df92d5c8d7ce0d95f9ef2-300x164.png',
      },
      {
        date: '24',
        month: 'Th1',
        title: 'Những mẹo lái ô tô an toàn cơ bản',
        description: 'Sắp xếp thời gian, không phân tâm, sử dụng GPS, là những thói quen...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/9_Khong_ngu_ngat_khi_lai_1-300x200.jpg',
      },
      {
        date: '24',
        month: 'Th1',
        title: 'Thử nghiệm và đánh giá Toyota Land Cruiser 2018',
        description: 'Toyota Land Cruiser 2018 có khả năng off-road tốt và độ tin cậy cao...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/LND_MY16_0037_V001-300x169.jpg',
      },
      {
        date: '24',
        month: 'Th1',
        title: 'Những điều cần lưu ý khi mua xe đã qua sử dụng',
        description: 'Việc mua lại ô tô cũ để tiết kiệm chi phí không còn quá xa lạ...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/1_Nhung_dieu_can_biet_khi_mua_mot_chiec_o_to_cu-300x177.jpg',
      },
      {
        date: '24',
        month: 'Th1',
        title: 'Những mẫu xe cỡ nhỏ mới đáng mua nhất 2019',
        description: 'Ford Focus, Mazda 3, Honda Civic và Chevrolet Bolt phiên bản 2018 đều...',
        imgUrl: 'https://mauweb.monamedia.net/cardinal/wp-content/uploads/2019/01/e08132c2671df92d5c8d7ce0d95f9ef2-300x164.png',
      }
    ]
    ;

const NewsSection = () => {
  return (
    <>
      <div className='box-news'>
        <div className='bg'>
          <div className='p1'>TIN TỨC</div>
        </div>
      </div>
      <div style={{ backgroundColor: '#1c1c1c', padding: '20px' }}>
        <Title level={3} style={{ color: 'white', textAlign: 'center' }}>
          TIN TỨC
        </Title>
        <Row gutter={[16, 16]}>
          {newsData.map((news, index) => (
            <Col key={index} xs={24} sm={12} md={6}>
              <Card
                hoverable
                cover={<img alt="news cover" src={news.imgUrl} />}
                className="news-card"
              >
                <div className="news-date">
                  <div>{news.date}</div>
                  <div>{news.month}</div>
                </div>
                <Title level={4} className="news-title">
                  {news.title}
                </Title>
                <Paragraph className="news-description">
                  {news.description}
                </Paragraph>
              </Card>

            </Col>
          ))}
        </Row>
      </div>
    </>

  );
};

export default NewsSection;
