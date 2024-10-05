import React, { useState, useEffect } from 'react';
import { Input, Button, Form, TreeSelect, Radio } from 'antd';
import axiosToken from '../../context/axiosToken';

const API = process.env.REACT_APP_API_URL_ADMIN;
const AdminCreateProductCategory = () => {
  const [productsCategory, setProductsCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
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
    console.log("Form submitted with values: ", values); // Add this line for debugging
    setLoading(true);
    axiosToken.post(`${API}/products-category/create`, values)
      .then((response) => {
        console.log('Success:', response.data);
        setLoading(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const generateTreeData = (productsCategory) => {
    return productsCategory.map(category => ({
      title: category.title, // This is used for the display in TreeSelect
      value: category._id,
      children: category.children ? generateTreeData(category.children) : []
    }));
  };

  const onChange = (newValue) => {
    console.log('newValue: ', newValue);
    setValue(newValue);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Tạo danh mục mới</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: 'active',
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
          label="Danh mục cha"
          name="parent_id"
          rules={[{ message: 'Vui lòng nhập tiêu đề!' }]}
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

        <Form.Item label="Trạng thái" name="status">
          <Radio.Group>
            <Radio value="active">Active</Radio>
            <Radio value="inactive">Inactive</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo danh mục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminCreateProductCategory;