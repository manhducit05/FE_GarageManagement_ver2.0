import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Input, Badge, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import "./detail.css"

function DetailProductClient() {
  const API = process.env.REACT_APP_API_URL_CLIENT;
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API}/products/${slug}`);
        const json = await res.json()

        console.log(json)

        if (json.data) {
          setProduct(json.data)
          document.title = json.pageTitle
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [API, slug]);

  function formatCurrency(number) {
    if (number) {
      const numberString = number.toString();
      const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      const formattedCurrency = formattedNumber + '₫';

      return formattedCurrency;
    }
  }

  const handlePay = () => {
    navigate("/login");
  }

  return (
    <>
      <div>
        {product ?
          <div className='product__content'>
            <div className='product__content--image'>
              <img src={product.thumbnail} />
            </div>

            <div className='product__content--price'>
              <h2 className='product__content--name'>{product.title}</h2>
              <span>Giá ưu đãi: {formatCurrency(product.price)}</span>
              <div className='orderProduct'>
                <div className='inner-wrap' onClick={handlePay}>
                  <div className='orderProduct--pay' >
                    <h2>MUA NGAY</h2>
                    <p>(Giao nhanh từ 2 giờ)</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          : <div>

          </div>
        }
      </div>
    </>
  )
}
export default DetailProductClient;