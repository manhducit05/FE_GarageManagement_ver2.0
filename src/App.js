import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Admin from './components/admin';
import AdminProducts from './components/admin/products'
import AdminDetailProduct from './components/admin/products/detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<Admin />} >
          <Route path="products" element={<AdminProducts />} />
          <Route path={`products/detail/:slug`} element={<AdminDetailProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
