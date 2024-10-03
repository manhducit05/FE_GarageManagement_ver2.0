import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Input, Badge, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';
import priceNewProducts from '../helper/product';

function ClientProductsInCategory({ permissions, permission }) {
  const API = process.env.REACT_APP_API_URL_CLIENT;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectionType, setSelectionType] = useState('checkbox');
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/products-category/${slug}`);
        const json = await res.json()
        
        document.title = json.pageTitle

        console.log("res: ", json)
        if (json.code == 400) {
          setProducts([])
          console.log("prd: ", products)
        } else {
          if (json.data != []) {
            setProducts(priceNewProducts(json.data))
            console.log("prd: ", products)

          }
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

  const handleProductName = () => {

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
        {(products.length > 0) ?
          (
            <div className='products__main'>
              <div className='container'>
                {products.map((item) => (
                  item.title &&
                  <div className='products__main--item' onClick={() => handleProductName(item)}>
                    <Badge.Ribbon className='badge'
                      text={`Giảm ${item.discountPercentage}%`}
                      color="red"
                    >
                      <img className='image__product--main' src={item.thumbnail} />
                      <span className='title'>{item.title}</span>
                      <div className='price'>
                        <span className='priceDiscount'><strong>{formatCurrency(item.price)}</strong></span>
                        <span className='priceOriginal'><strong>{formatCurrency(item.priceNew)}</strong></span>
                      </div>
                    </Badge.Ribbon>
                  </div >
                ))}
              </div >
            </div >
          )
          :
          (<div className='products__main'>
            <div className='container'>
              Không tồn tại sản phẩm nào
            </div>
          </div>
          )

        }
      </div>
    </>
  );
}

export default ClientProductsInCategory;
