import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Input, Table, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

function AdminRoles() {
  const API = process.env.REACT_APP_API_URL;
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectionType, setSelectionType] = useState('checkbox');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch(`${API}/roles`);
        const json = await res.json();
        console.log(json)
        if (json.roles != []) {
          setRoles(json.roles);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [API]);

  const handleRoleName = (item) => {
    navigate(`/admin/`);
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

    const fetchRoles = async () => {
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
        setRoles((prevProducts) =>
          prevProducts.filter((product) => product.slug !== record.slug)
        ); // Update the product list after successful deletion

      } catch (error) {
        setError(error.message); // Set error if something goes wrong
        console.error("Delete error:", error);
      } finally {
        setLoading(false); // End loading after the delete operation
      }
    };

    fetchRoles(); // Call the function to initiate the delete request
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
      title: 'Nhóm quyền',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <span onClick={() => handleRoleName(record)} style={{ cursor: 'pointer' }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (description) => (<span>{description}</span>),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (<Button className='btn-warn' type='primary'>{status === "active" ? "Hoạt động" : "Dừng hoạt động"}</Button>),
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
          <Button className='' type="primary" onClick={() => handleDetail(record)} style={{ background: 'linear-gradient(135deg, #6253e1, #04befe)' }}><b>Chi tiết</b></Button>
          <Button className='btn-warn' type="primary" onClick={() => handleEdit(record)}><b>Sửa</b></Button>
          <Button type="primary" danger onClick={() => showDeleteConfirm(record)}><b>Xóa</b></Button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {roles ? (
        <div className='product'>
          <div>
            <h1>Danh sách sản phẩm</h1>
          </div>
          <Row>
            <Col span={16}>
            </Col>
            <Button type="primary" onClick={() => handleAddProduct()}>Thêm sản phẩm</Button>
          </Row>
          <div className="mt-2">
            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={roles.map((product) => ({ ...product, key: product.id }))}
            />
          </div>
        </div>)
        : <div>Không có sản phẩm nào để hiển thị</div>}
    </div>
  );
}

export default AdminRoles;