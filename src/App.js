import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebsiteLayout from './layouts/WebsiteLayout';
import Index from './website/pages';
import Menu from './website/pages/menu';
import Contact from './website/pages/contact'
// import Today_special from './website/pages/today_special'
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './Admin/pages/dashboard';
import MenuItems from './Admin/pages/Menu-items';
import Orders from './Admin/pages/Orders';
import EmployeePage from './Admin/pages/Employees';
import Customers from './Admin/pages/Customers';
import Inventory from './Admin/pages/Inventory';
import Categories from './Admin/pages/Categories';
import Offers from './Admin/pages/Offers';
import Reservations from './Admin/pages/Reservation';
import Settings from './Admin/pages/Settings/Setting';
import Cart from './website/pages/Cart';
import Checkout from './website/pages/Checkout';
import About from './website/pages/About';






function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<WebsiteLayout />}>
            <Route path="/" element={<><Index /></>} />
            <Route path="/menu" element={<><Menu /></>} />
            {/* <Route path='/today_special' element={<><Today_special /></>} /> */}
            <Route path='/about' element={<><About/></>}/>
            <Route path='/Contact' element={<><Contact /></>} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/cart/checkout' element={<Checkout />} />
          </Route>
          {/* admin pages routing */}

          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='menu' element={<MenuItems />} />
            <Route path='orders' element={<Orders />} />
            <Route path='employees' element={<EmployeePage />} />
            <Route path='customers' element={<Customers />} />
            <Route path='inventory' element={<Inventory />} />
            <Route path='categories' element={<Categories />} />
            <Route path='offers' element={<Offers />} />
            <Route path='reservations' element={<Reservations />} />
            <Route path='settings' element={<Settings />} />
          </Route>
        </Routes>
      </Router>

    </>
  );
}

export default App;
