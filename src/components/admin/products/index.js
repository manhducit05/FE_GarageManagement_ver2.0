import React, { useEffect, useState } from 'react';
import { Button, Space, Input, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { createStyles } from 'antd-style';
const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

function AdminProducts() {
  const API = process.env.REACT_APP_API_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectionType, setSelectionType] = useState('checkbox');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/products`);
        const json = await res.json();
        setProducts(json.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API]);

  const handleProductName = (item) => {
    navigate(`/admin/products/detail/${item.slug}`);
  };

  const handlePositionChange = (item) => {

  }

  const handleDetail = (record) => {
    console.log('View details:', record);
    navigate(`/admin/products/detail/${record.slug}`);
  };

  const handleEdit = (record) => {
    console.log('Edit product:', record);
    navigate(`/admin/products/edit/${record.slug}`);
  };

  const handleDelete = (record) => {
    console.log('Delete product:', record);
    // Add your delete logic here
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`Selected Row Keys: ${selectedRowKeys}`, 'Selected Rows: ', selectedRows);
    },
  };

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <span onClick={() => handleProductName(record)} style={{ cursor: 'pointer' }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price}đ`,
    },
    {
      title: 'Giảm',
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
      render: (discount) => `${discount}%`,
    },
    {
      title: 'Vị trí',
      dataIndex: 'position',
      key: 'position',
      render: (position) => (
        <Input
          defaultValue={position}
          onChange={(e) => handlePositionChange(e, position.key)}
        />
      ),
    }, {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button className='styles.linearGradientButton' onClick={() => handleDetail(record)} ><b>Chi tiết</b></Button>
          <Button type="primary" onClick={() => handleEdit(record)} style={{ backgroundColor: '#FFC107', borderColor: '#FFC107' }}>Sửa</Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <div className='product'>
        <div className='container'>
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={products.map((product) => ({ ...product, key: product.id }))}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
