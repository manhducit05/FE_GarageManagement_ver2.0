import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './index.css';
import Layout from './layout/index';

export default function Admin() {

  return (
    <div>
      <Layout />
    </div>
  );
}
