import React, { useEffect, useState, useContext } from 'react';
import { Badge } from 'antd'
import { useNavigate } from 'react-router-dom';
import "./index.css"

function AdminProducts() {
  const API = process.env.REACT_APP_API_URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await fetch(`${API}/products`)
          .then(res => res.json())
          .then(json => {
            console.log(json)
            console.log(API + '/products')
            setProducts(json.products)
          })
      } catch (error) {
        console.error("Fetch error:", error); // Hiển thị lỗi fetch
        console.error("Fetch error:", error.message); // Hiển thị lỗi fetch
        setError(error.message); // Cập nhật lỗi
      } finally {
        setLoading(false); // Đặt trạng thái tải xong
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // const handleShowProductDetail = (item) => {
  //   const slug = item.slug
  //   navigate(`/admin/products/detail/${slug}`);
  // }



  const handleProductName = (item) => {
    console.log(item)
    var formatted_string = item.slug
    navigate(`/admin/products/detail/${formatted_string}`);
  }

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <div className='product'>
        <div className='container'>
          {products.map((item) => (
            <div className='product_item' onClick={() => handleProductName(item)}>
              <Badge.Ribbon className='badge'
                text={`Giảm ${item.discountPercentage}%`}
                color="red"
              >
                <img className='image__product' src={item.thumbnail} /> <br />
                <h3>{item.title}</h3>
                <div className='price'>
                  <span className='priceOrigin'><strong>{(item.price)}đ</strong></span>
                </div>
              </Badge.Ribbon>
            </div >
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
