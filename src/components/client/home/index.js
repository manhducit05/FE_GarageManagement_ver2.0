import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './home.css';


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

  return (
    <>
      <div className='box-1'>
        <div className='bg'>
          <div className='p1'>TIẾT KIỆM NHIỀU HƠN VỚI CÁC GÓI COMBO ƯU ĐÃI</div>
          <div className='p2'>
            Chúng tôi nâng niu xe bạn
          </div>
          <div className='p3'>
            Như cách bạn nâng niu xe chính mình
          </div>
        </div>
      </div>
      <div className='box-2'>
        <div className="container text-light">
          <div className="text-center mb-5">
            <div className='title'>AUTOWASH - TRUNG TÂM RỬA VÀ CHĂM SÓC XE HƠI CHUYÊN NGHIỆP</div>
            <div className="desc mt-3">
              Cung cấp dịch vụ rửa xe & chăm sóc xe chuyên nghiệp
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <img
                src="https://autowash.vn/wp-content/uploads/2019/04/r%E1%BB%ADa-xe-%C3%B4-t%C3%B4-qu%E1%BA%ADn-7-e1587810874742-300x225.jpg" // Thay bằng link ảnh của bạn
                alt="Car wash service"
                className="img-fluid mb-3"
              />
              <img
                src="https://autowash.vn/wp-content/uploads/2019/04/rua-xe-oto-quan-7-e1587810773796.jpg" // Thay bằng link ảnh của bạn
                alt="Car service"
                className="img-fluid mb-3"
              />
              <img
                src="https://autowash.vn/wp-content/uploads/2019/03/vesinhkhoangmay-e1587810345128-300x114-1.jpg" // Thay bằng link ảnh của bạn
                alt="Car engine clean"
                className="img-fluid mb-3"
              />
            </div>

            <div className="col-6">
              <div className='mb-5 subtitle'>
                AutoWash được biết đến là đơn vị chuyên cung cấp các dịch vụ rửa xe và chăm sóc xe (detailings)
                hàng đầu với hơn 25 năm kinh nghiệm hoạt động trong ngành. Sứ mệnh của AutoWash là luôn
                mang đến cho bạn những trải nghiệm đặc sắc nhất cùng sự hài lòng chân thật nhất có thể khi
                bạn đến và sử dụng dịch vụ tại đây...
              </div>
              <div className='row'>
                <div className='col-6'>
                  <div className='text-center mb-4 mt-3'><i class="fa-solid fa-soap"></i></div>
                  <ul>
                    <li className='d-flex '>
                      <i class="fa-solid fa-check"></i>
                      <div className='txt'>AutoWash cung cấp đa dạng dịch vụ chăm sóc xe từ phổ thông đến cao cấp với giá thành cạnh tranh</div>
                    </li>
                    <li className='d-flex'>
                      <i class="fa-solid fa-check"></i>
                      Dung dịch nhập khẩu từ Mỹ chất lượng cao, có tính năng tự phân hủy và thân thiện với môi trường
                    </li>
                    <li className='d-flex'>
                      <i class="fa-solid fa-check"></i>
                      Các dịch vụ như rửa xe, vệ sinh nội thất ô tô, vệ sinh khoang máy xe hơi, đánh bóng xe ô tô, tẩy ố mốc kính xe ô tô,...
                    </li>
                    <li className='d-flex'>
                      <i class="fa-solid fa-check"></i>
                      Ứng dụng công nghệ rửa xe hơi nước nóng tốt nhất thị trường
                    </li>
                    <li className='d-flex'>
                      <i class="fa-solid fa-check"></i>
                      Nhân viên rửa xe được đào tạo chuyên môn, tay nghề cao, thái độ tốt
                    </li>
                  </ul>
                </div>
                <div className='col-6'>
                  <div className='text-center mb-4 mt-3'>
                    <i class="fa-solid fa-address-book"></i>
                  </div>
                  <ul>
                    <li className='d-flex '>
                      <i class="fa-solid fa-check"></i>
                      <div>AutoWash luôn cởi mở và sẵn sàng tiếp thu ý kiến khách hàng</div>
                    </li>
                    <li className='d-flex'>
                      <i class="fa-solid fa-check"></i>
                      <div>
                        Hệ thống book lịch hẹn rửa xe, chăm sóc xe đầy tiện lợi
                      </div>
                    </li>
                    <li className='d-flex'>
                      <i class="fa-solid fa-check"></i>
                      <div>
                        Mọi thông tin về các dịch vụ chăm sóc xe, rửa xe được cung cấp miễn phí

                      </div>
                    </li>
                    <li className='d-flex'>
                      <i class="fa-solid fa-check"></i>
                      <div>
                        Khách hàng có thể thanh toán linh hoạt bằng nhiều hình thức như tiền mặt, chuyển khoản hoặc thanh toán trực tuyến.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>


        </div>
      </div>
      <div className='box-3'>
        <div className="container text-light py-5">
          <h1 className="text-center mb-4">Hoạt Động Rửa Và Chăm Sóc Xe Của AutoWash</h1>
          <p className="text-center mb-4">
            Hình ảnh dịch vụ rửa xe và chăm sóc xe hàng đầu Việt Nam
          </p>
          <div className='thumbnail text-center'>
            <img src='/img/box-3.png'/>

          </div>
          {/* Nút "Xem Thêm" */}
        </div>
      </div>

    </>
  );
}

export default HomeClient;