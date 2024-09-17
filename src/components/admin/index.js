import React from 'react';
import { Row, Col } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarAdmin from './sidebar/sidebar';
export default function Admin({ isError404 }) {
  return (
    <div>
      <Row>
        {!isError404 && (
          <Col span={4}>
            <SidebarAdmin />
          </Col>
        )}
        <Col span={isError404 ? 24 : 18}>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}

