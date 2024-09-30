import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Input, Table, Modal } from 'antd';
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

  return (
    <>
      <div>
        {products ?
          (<div> Có </div>)
          :
          (<div> Không </div>)

        }
      </div>
    </>
  );
}

export default ClientProductsInCategory;
