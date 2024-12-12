import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Input, Table, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.css';
import axiosToken from '../../context/axiosToken';

const { confirm } = Modal;

function AdminProducts({ permissions, permission }) {
  const API = process.env.REACT_APP_API_URL_ADMIN;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectionType, setSelectionType] = useState('checkbox');
  const navigate = useNavigate();

  console.log("Per: ", permissions)
  console.log("per: ", permission)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosToken.get(`${API}/products`);
        if (res.data.products != []) {
          setProducts(res.data.products);
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

  const handleAddProduct = () => {
    navigate(`/admin/products/create`)
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
        const res = await axiosToken.patch(`${API}/products/delete/${record.slug}`)

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
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

          {(permissions?.includes("products_view")) ?
            < Button className='' type="primary" onClick={() => handleDetail(record)} style={{ background: 'linear-gradient(135deg, #6253e1, #04befe)' }}><b>Chi tiết</b></Button>
            : ""
          }
          {(permissions?.includes("products_edit")) ?
            < Button className='btn-warn' type="primary" onClick={() => handleEdit(record)
            } > <b>Sửa</b></Button >
            : ""
          }
          {(permissions?.includes("products_delete")) ?
            <Button type="primary" danger onClick={() => showDeleteConfirm(record)}><b>Xóa</b></Button>
            : ""
          }
        </div >
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products ? (
        <div className='product'>
          <div>
            <h1>Danh sách sản phẩm</h1>
          </div>
          <Row>
            {(permissions?.includes("products_create")) ?
              <Button type="primary" onClick={() => handleAddProduct()}>Thêm sản phẩm</Button>
              : ""
            }
          </Row>
          <div className="mt-2">
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
