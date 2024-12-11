import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Admin from './components/admin';
import Error404 from './components/admin/page/error404/error404';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/admin/middleware/auth.middleware';
import LoginAdmin from './components/admin/login/index'
import DashboardAdmin from './components/admin/dashboard';
import Client from './components/client';
import HomeClient from './components/client/home';
import LoginClient from './components/client/login';
import RegisterClient from './components/client/register';
import NewsSection from './components/client/news/news';


import Customer from './components/admin/customers';
import CustomerDetail from './components/admin/customers/detail';
import CustomerEdit from './components/admin/customers/edit';

import Services from './components/admin/services';
import ServiceDetail from './components/admin/services/detail';
import ServiceEdit from './components/admin/services/edit';

import Technician from './components/admin/technician';
import TechnicianDetail from './components/admin/technician/details';
import TechnicianEdit from './components/admin/technician/edit';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin/login" element={<LoginAdmin />} />
        <Route element={<PrivateRoute />}>
          <Route path="admin" element={<Admin />} >
            <Route path="dashboard" element={<DashboardAdmin />} />

            <Route path="customers" element={<Customer />} />
            <Route path="customers/:id" element={<CustomerDetail />} />
            <Route path="customers/edit/:id" element={<CustomerEdit />} />

            <Route path="services" element={<Services />} />
            <Route path="services/:id" element={<ServiceDetail />} />
            <Route path="services/edit/:id" element={<ServiceEdit />} />

            <Route path="technicians" element={<Technician />} />
            <Route path="technicians/:id" element={<TechnicianDetail />} />
            <Route path="technicians/edit/:id" element={<TechnicianEdit />} />

          </Route >
        </Route >

        <Route path="/login" element={<LoginClient />} />
        <Route path="/register" element={<RegisterClient />} />
        <Route path="/" element={<Client />} >
          <Route index element={<HomeClient />} />
          <Route path='/news' element={<NewsSection />}/>
        </Route>
        <Route path={`/error404`} element={<Error404 />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;