import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Admin from './components/admin';
import AdminProducts from './components/admin/products'
import AdminDetailProduct from './components/admin/products/detail';
import AdminCreateProduct from './components/admin/products/create';
import Error404 from './components/admin/page/error404/error404';
import AdminRoles from './components/admin/roles/index'
import AdminAccounts from './components/admin/accounts/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/admin/middleware/auth.middleware';
import LoginAdmin from './components/admin/login/index'
import DashboardAdmin from './components/admin/dashboard';
import PermissionMiddleware from './components/admin/middleware/permission.middleware';
import AdminCreateAccount from './components/admin/accounts/create';
import AdminAccountsBin from './components/admin/accounts/restore';
import AdminPermissions from './components/admin/roles/permission';
import AdminProductsCategory from './components/admin/products-category';
import Client from './components/client';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin/login" element={<LoginAdmin />} />
        <Route path="admin" element={<Admin />} >
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="products-category" element={
              <PermissionMiddleware permission="products-category_view">
                <AdminProductsCategory />
              </PermissionMiddleware>
            } />
            <Route path="products" element={
              <PermissionMiddleware permission="products_view">
                <AdminProducts />
              </PermissionMiddleware>
            } />
            <Route path={`products/create`} element={
              <PermissionMiddleware permission="products_create">
                <AdminCreateProduct />
              </PermissionMiddleware>
            } />
            <Route path={`products/detail/:slug`} element={<AdminDetailProduct />} />
            {/* end route products */}
            <Route path="roles" element={
              <PermissionMiddleware permission="roles_view">
                <AdminRoles />
              </PermissionMiddleware>
            } />

            <Route path="permissions" element={
              <PermissionMiddleware permission="roles_view">
                <AdminPermissions />
              </PermissionMiddleware>
            } />
            {/* end roles products */}
            < Route path="accounts" element={
              <PermissionMiddleware permission="accounts_view">
                <AdminAccounts />
              </PermissionMiddleware>
            } />
            <Route path={`accounts/create`} element={
              <PermissionMiddleware permission="accounts_create">
                <AdminCreateAccount />
              </PermissionMiddleware>
            } />

            <Route path={`accounts/bin`} element={
              <PermissionMiddleware permission="accounts_bin">
                <AdminAccountsBin />
              </PermissionMiddleware>
            } />
            {/* end accounts products */}
          </Route >
        </Route >

        <Route path="/" element={<Client />} >
        </Route>
        <Route path={`/error404`} element={<Error404 />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;