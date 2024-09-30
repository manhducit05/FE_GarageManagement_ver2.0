import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Input, Badge, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';


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
        console.log("res: ", json)
        if (json.data != []) {
          setProducts(json.data)
          console.log("prd: ", products)
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleProductName = () => {

  }

  return (
    <>
      <div>
        {products ?
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
                      <h3>{item.title}</h3>
                      <div className='price'>
                        <span className='priceDiscount'><strong>{item.price}</strong></span>
                        <span className='priceOriginal'><strong>{item.priceNew}</strong></span>
                      </div>
                    </Badge.Ribbon>
                  </div >
                ))}
              </div >
            </div >
          )
          :
          (<div> Không </div>)

        }
      </div>
    </>
  );
}

export default ClientProductsInCategory;
