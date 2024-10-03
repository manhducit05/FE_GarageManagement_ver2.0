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

        setProduct(json.data)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [API, slug]);

  return (
    <>
      <div>
        {product ?
          <div>
            {product.title}
          </div>
          : <div>

          </div>
        }
      </div>
    </>
  )
}
export default DetailProductClient;