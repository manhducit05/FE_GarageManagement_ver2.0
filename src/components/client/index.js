import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './index.css';
import Layout from './layout/layout';

export default function Client() {

  return (
    <div>
      <Layout />
    </div>
  );
}
