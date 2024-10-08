import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Input, Badge, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';
import priceNewProducts from '../helper/product';

function HomeClient({ permissions, permission }) {
  const API = process.env.REACT_APP_API_URL_CLIENT;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectionType, setSelectionType] = useState('checkbox');
  const { slug } = useParams();
  const navigate = useNavigate();

  document.title = "Gấu bông cao cấp - Shop bán gấu bông Đẹp - Giá rẻ";
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/products/products-feature`);
        const json = await res.json()
        console.log("res: ", json)
        if (json.productsFeature != []) {
          setProducts(priceNewProducts(json.productsFeature))
          console.log("prd: ", products)
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API, slug]);


  if (loading) return <div className='products__main'>Loading...</div>;
  if (error) return <div className='products__main'>Error: {error}</div>;

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
      <div>
        {products ?
          (
            <div className='products__main-feature'>
              {products.map((item) => (
                item.title &&
                <div className='products__main--item' onClick={() => handleProductName(item)}>

                  <Badge.Ribbon className='badge'
                    text={`Nổi bật`}
                    color="green"
                  />
                  <Badge.Ribbon className='badge badge2'
                    text={`Giảm ${item.discountPercentage}%`}
                    color="red"
                  >
                    <img className='image__product--main-badge' src={item.thumbnail} />
                    <div className='titleVPrice'>
                      <span className='title-badge '>{item.title}</span>
                      <div className='price-badge '>
                        <span className='priceDiscount-badge '><strong>{formatCurrency(item.priceNew)}</strong></span>
                        <span className='priceOriginal-badge '><strong>{formatCurrency(item.price)}</strong></span>
                      </div>
                    </div>
                  </Badge.Ribbon>
                </div >
              ))}
            </div >
          )
          :
          (<div> Không </div>)

        }
      </div >
    </>
  );
}

export default HomeClient;