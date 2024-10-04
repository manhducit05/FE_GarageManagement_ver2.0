import React, { useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import "./detail.css";

function DetailProductClient() {
  const API = process.env.REACT_APP_API_URL_CLIENT;
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Kết nối đến server qua cổng 8080
    const socketInstance = io("http://localhost:8080", {
      transports: ['websocket', 'polling'],
      path: '/socket.io',
    });

    socketInstance.on("connect", () => {
      console.log("Connected to server:", socketInstance.id);
    });

    setSocket(socketInstance);
  }, [API]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API}/products/${slug}`);
        const json = await res.json();

        if (json.data) {
          setProduct(json.data);
          document.title = json.pageTitle;
        }
      } catch (error) {
        message.error(error.message); // Hiển thị lỗi nếu có
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [API, slug]);

  const formatCurrency = (number) => {
    if (number) {
      return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫`;
    }
    return "";
  };

  const handleOrderClick = () => {
    if (!phoneNumber) {
      console.log("Vui lòng nhập số điện thoại!");
      return;
    }

    const orderData = {
      product: product.title,
      phoneNumber: phoneNumber,
    };

    socket.emit("order", orderData);
    console.log("Đặt hàng thành công!")
    if (socket) {

    } else {
      console.log("Không thể kết nối tới server!");
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='product__content'>
          <div className='product__content--image'>
            <img src={product.thumbnail} alt={product.title} />
          </div>

          <div className='product__content--price'>
            <h2 className='product__content--name'>{product.title}</h2>
            <span>Giá ưu đãi: {formatCurrency(product.price)}</span>
            <div className='orderProduct'>
              <div className="order-form mt-4">
                <Input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="phone-input"
                  placeholder="Nhập số điện thoại"
                  required
                />
                <Button type="primary" className="order-button" onClick={handleOrderClick}>
                  Đặt hàng nhanh
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailProductClient;
