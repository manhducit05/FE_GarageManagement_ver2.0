import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Input, Table, Modal } from 'antd';
import { DeleteOutlined } from "@ant-design/icons"
import { useNavigate } from 'react-router-dom';
import "./index.css"
import axiosToken from '../../context/axiosToken';

const { confirm } = Modal;

function AdminAccounts() {
  const API = process.env.REACT_APP_API_URL_ADMIN;
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectionType, setSelectionType] = useState('checkbox');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axiosToken.get(`${API}/accounts`);
        console.log(res)
        if (res.data.accounts != []) {
          setAccounts(res.data.accounts);
          console.log(accounts)
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [API]);

  const handlePositionChange = (item) => {

  }

  const handleAddAccount = () => {
    navigate(`/admin/accounts/create`)
  }

  const handleDetail = (record) => {
    console.log('View details:', record);
    navigate(`/admin/accounts`);
  };

  const handleEdit = (record) => {
    console.log('Edit product:', record);
    navigate(`/admin/accounts`);
  };

  const handleDelete = (record) => {
    console.log('Delete account:', record);

    const fetchAccounts = async () => {
      setLoading(true); // Start loading when initiating the delete request
      try {
        const res = await axiosToken.patch(`${API}/accounts/delete/${record._id}`)

        setAccounts((prevAccounts) =>
          prevAccounts.filter((account) => account._id !== record._id)
        ); // Update the product list after successful deletion

      } catch (error) {
        setError(error.message); // Set error if something goes wrong
        console.error("Delete error:", error);
      } finally {
        setLoading(false); // End loading after the delete operation
      }
    };

    fetchAccounts(); // Call the function to initiate the delete request
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

  const handleBin = () => {
    navigate("/admin/accounts/bin")
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`Selected Row Keys: ${selectedRowKeys}`, 'Selected Rows: ', selectedRows);
    },
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => (
        <img className="avt" src={avatar} />
      ),
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (fullName) => (<span>{fullName}</span>),
    },
    {
      title: 'Phân quyền',
      dataIndex: 'role.title',
      key: 'role.title',
      render: (text, record) => (<span>{(record.role.title != null) ? record.role.title : ""}</span>),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'pemailosition',
      render: (email) => (
        <span>{email}</span>
      ),
    }, {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Button className='btn-warn' type='primary'>{status === "active" ? "Hoạt động" : "Dừng hoạt động"}</Button>
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
      {accounts ? (
        <div className='product'>
          <div>
            <h1>Danh sách sản phẩm</h1>
          </div>
          <Row>
            <Button type="primary" onClick={() => handleAddAccount()}>Thêm tài khoản</Button>
            <Col span={14}>
            </Col>
            <span className='bin' onClick={handleBin}><DeleteOutlined className='custom-icon-bin ' /><span className='text-bin'><b>Thùng rác</b></span></span>
          </Row>
          <div className="mt-2">
            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={accounts.map((item) => ({ ...item, key: item.id }))}
            />
          </div>
        </div>)
        : <div>Không có tài khoản nào để hiển thị</div>
      }
    </div >
  );
}

export default AdminAccounts;