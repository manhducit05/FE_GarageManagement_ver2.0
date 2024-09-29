import React, { useState, useEffect } from 'react';
import { Input, Button, Form, TreeSelect } from 'antd';
import axiosToken from '../../context/axiosToken';

const API = process.env.REACT_APP_API_URL_ADMIN;
const AdminCreateProduct = () => {
  const [productsCategory, setProductsCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState();
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

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

  const onFinish = (values) => {
    setLoading(true);
    console.log('Form values:', values);

    // Sending a POST request to create a new product
    axiosToken.post(`${API}/products/create`, values) // axios tự động stringify body
      .then((response) => {
        console.log('Success:', response.data); // Dữ liệu trả về từ server
        setLoading(false);
        form.resetFields(); // Reset form sau khi tạo thành công
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false); // Dừng loading khi có lỗi
      });
  }

  const generateTreeData = (productsCategory) => {
    return productsCategory.map(category => ({
      title: category.title, // This is used for the display in TreeSelect
      value: category._id,
      children: category.children ? generateTreeData(category.children) : []
    }));
  };

  const onChange = (newValue) => {
    console.log('newValue: ', newValue);
    // if (newValue)
    //   setValue(newValue);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Tạo sản phẩm mới</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: 'active',
          featured: 'Màu xám',
          position: 1
        }}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
        >
          <Input placeholder="Nhập tiêu đề sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="product_category_id"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
        >
          <TreeSelect
            treeData={generateTreeData(productsCategory)}
            placeholder="Chọn danh mục sản phẩm"
            treeDefaultExpandAll
            allowClear
            value={value}
            treeNodeFilterProp="title"
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
        >
          <Input type="number" placeholder="Nhập giá sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Phần trăm giảm giá"
          name="discountPercentage"
          rules={[{ required: true, message: 'Vui lòng nhập phần trăm giảm giá!' }]}
        >
          <Input type="number" placeholder="Nhập % giảm giá" />
        </Form.Item>

        <Form.Item
          label="Tồn kho"
          name="stock"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho!' }]}
        >
          <Input type="number" placeholder="Nhập số lượng tồn kho" />
        </Form.Item>

        <Form.Item
          label="Hình thu nhỏ"
          name="thumbnail"
          rules={[{ required: true, message: 'Vui lòng nhập URL hình thu nhỏ!' }]}
        >
          <Input placeholder="Nhập URL hình thu nhỏ" />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
        >
          <Input placeholder="Trạng thái sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Màu nổi bật"
          name="featured"
        >
          <Input placeholder="Nhập màu nổi bật" />
        </Form.Item>

        <Form.Item
          label="Vị trí"
          name="position"
        >
          <Input type="number" placeholder="Nhập vị trí sản phẩm" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminCreateProduct;