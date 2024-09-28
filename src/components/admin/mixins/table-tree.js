import React from 'react';
import { Input, Table, Button } from 'antd';

// Function to recursively process the tree data
export function DataTree({ items }) {
  const processTreeData = (items, level = 1) => {
    if (!items) return [];

    return items.map((item) => {
      const prefix = Array(level).join('-- '); // Generate prefix for hierarchy

      const processedItem = {
        ...item,
        key: item._id, // Assuming '_id' is the unique key
        title: `${prefix}${item.title}`, // Handle undefined title
      };

      // If item has children, recursively process them, incrementing the level
      if (item.children && item.children.length > 0) {
        processedItem.children = processTreeData(item.children, level + 1);
      }

      return processedItem;
    });
  };

  // Return processed tree data
  return processTreeData(items);
}

// Component to render the table with hierarchical data
export function TableTree({ data, permissions, onDetail, onEdit, onDelete }) {
  const renderColumns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span>{text}</span>, // Render title with prefix
    },
    {
      title: 'Vị trí',
      dataIndex: 'position',
      key: 'position',
      render: (position) => (
        <Input defaultValue={position} onChange={(e) => console.log(e.target.value)} />
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {permissions?.includes('products_view') && (
            <Button type='primary' onClick={() => onDetail(record)}>
              <b>Chi tiết</b>
            </Button>
          )}
          {permissions?.includes('products_edit') && (
            <Button className='btn-warn' type='primary' onClick={() => onEdit(record)}>
              <b>Sửa</b>
            </Button>
          )}
          {permissions?.includes('products_delete') && (
            <Button type='primary' danger onClick={() => onDelete(record)}>
              <b>Xóa</b>
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={renderColumns}
      dataSource={data}
      rowKey="key"
    />
  );
}
