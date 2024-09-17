import React, { useEffect, useState } from 'react';
import { Button, Space, Input, Table, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.css';

const { confirm } = Modal;

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
        console.log(json)
        if (json.products != []) {
          setProducts(json.products);
        }
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

    const fetchProducts = async () => {
      setLoading(true); // Start loading when initiating the delete request
      try {
        const res = await fetch(`${API}/products/delete/${record.slug}`, {
          method: 'PATCH', // Specify DELETE method
        });

        if (!res.ok) {
          throw new Error('Failed to delete the product'); // Handle non-200 status
        }

        const json = await res.json();
        console.log('Deleted product:', json);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.slug !== record.slug)
        ); // Update the product list after successful deletion

      } catch (error) {
        setError(error.message); // Set error if something goes wrong
        console.error("Delete error:", error);
      } finally {
        setLoading(false); // End loading after the delete operation
      }
    };

    fetchProducts(); // Call the function to initiate the delete request
  };

  const showDeleteConfirm = (record) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      okButtonProps: {
        style: {
          background: 'linear-gradient(135deg, #6253e1, #04befe)',
          color: '#fff',               // Màu chữ trắng
        },
      },
      onOk() {
        handleDelete(record);
      },
      onCancel() {
        console.log('Hủy thao tác xóa');
      },
    });
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
          <Button type="primary" onClick={() => handleDetail(record)} style={{ background: 'linear-gradient(135deg, #6253e1, #04befe)' }}><b>Chi tiết</b></Button>
          <Button type="primary" onClick={() => handleEdit(record)} style={{ backgroundColor: '#FFC107', borderColor: '#FFC107' }}><b>Sửa</b></Button>
          <Button type="primary" danger onClick={() => showDeleteConfirm(record)}><b>Xóa</b></Button>
        </Space>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products ? (
        <div className='product'>
          <div className='container'>
            <h1>Danh sách sản phẩm</h1>
            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={products.map((product) => ({ ...product, key: product.id }))}
            />
          </div>
        </div>)
        : <div>Không có sản phẩm nào để hiển thị</div>}
    </div>
  );
}

export default AdminProducts;
