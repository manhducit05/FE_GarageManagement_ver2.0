import React, { useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import "./detail.css";

function DetailProductClient() {
  const API = process.env.REACT_APP_API_URL_CLIENT;
  const API_ADMIN = process.env.REACT_APP_API_URL_ADMIN;

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

  const handleOrderClick = async () => {
    if (!phoneNumber) {
      return;
    }

    const orderData = {
      product: product.title,
      phoneNumber: phoneNumber,
      type: "quickOrder",
    };

    socket.emit("order", orderData);

    try {
      const response = await fetch(`${API_ADMIN}/notifications/postQuickOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log('result: ', result);

      if (result.code === 200) {
        message.success("Đặt hàng thành công!");
      } else {
        message.error(result.message || "Đặt hàng thất bại!");
      }
    } catch (error) {
      message.error("Lỗi khi gửi yêu cầu đặt hàng!");
      console.log("Error:", error);
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
