import React, { useEffect, useState } from 'react';
import { Button, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosToken from '../../context/axiosToken';
import { DataTree, TableTree } from '../mixins/table-tree';

function AdminProductsCategory({ permissions }) {
  const API = process.env.REACT_APP_API_URL_ADMIN;
  const [productsCategory, setProductsCategory] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsCategory = async () => {
      try {
        const res = await axiosToken.get(`${API}/products-category`);

        console.log(res.data)
        if (res.data.categories) {
          setProductsCategory(res.data.categories);
          console.log('categories: ', productsCategory)
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsCategory();
  }, [API]);

  // Process tree data whenever the productsCategory state changes
  useEffect(() => {
    if (productsCategory.length > 0) {
      const tree = DataTree({ items: productsCategory, level: 1 });
      setTreeData(tree);
      console.log("treeData: ", treeData)
    }
  }, [productsCategory]);

  const handleDetail = (record) => {
    console.log('View details for:', record);
  };

  const handleEdit = (record) => {
    console.log('Edit record:', record);
  };

  const handleDelete = (record) => {
    console.log('Delete record:', record);
  };

  const handleAddProduct = () => {
    navigate(`/admin/products/create`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {productsCategory.length > 0 ? (
        <div className='product'>
          <div>
            <h1>Danh mục sản phẩm</h1>
          </div>
          <Row>
            {permissions?.includes('products_create') && (
              <Button type='primary' onClick={handleAddProduct}>
                Thêm danh mục
              </Button>
            )}
          </Row>
          <div className='mt-2'>
            <TableTree
              data={treeData} // Pass the processed tree data
              permissions={permissions}
              onDetail={handleDetail}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      ) : (
        <div>Không có sản phẩm nào để hiển thị</div>
      )}
    </div>
  );
}

export default AdminProductsCategory;
