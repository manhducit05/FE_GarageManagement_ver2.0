import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Admin from './components/admin';
import AdminProducts from './components/admin/products'
import AdminDetailProduct from './components/admin/products/detail';
import AdminCreateProduct from './components/admin/products/create';
import Error404 from './components/admin/page/error404/error404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<Admin />} >
          <Route path="products" element={<AdminProducts />} />
          <Route path={`products/create`} element={<AdminCreateProduct />} />
          <Route path={`products/detail/:slug`} element={<AdminDetailProduct />} />
        </Route>
        <Route path={`/error404`} element={<Error404 />} />
        <Route path={`*`} element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
