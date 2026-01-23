import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebsiteLayout from './layouts/WebsiteLayout';
import Index from './website/pages';
import Menu from './website/pages/menu';
import Contact from './website/pages/contact'
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
import MenuItemDetails from './website/pages/MenuItemDetails';
import Profile from './website/pages/Profile';
import CafeAuth from './Authnetication/authentication';
import OrderDetail from './website/pages/Orderdetail';
import Wishlist from './website/pages/Whishlist';
import UserProtectedRoute from './Routes/UserProtectedRoute';
import AdminProtectedRoute from './Routes/AdminProtectedRoute';
import AdminLogin from './Authnetication/Adminlogin';
import AdminLockRoute from './Routes/AdminLockRoute';
import UserLockRoute from './Routes/UserLockRoute';






function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AdminLockRoute><WebsiteLayout /></AdminLockRoute>}>
            <Route path="/" element={<><Index /></>} />
            <Route path="/menu" element={<><Menu /></>} />
            <Route path="/menuitem/:id" element={<MenuItemDetails />} />
            <Route path='/about' element={<><About /></>} />
            <Route path='/Contact' element={<><Contact /></>} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/checkout" element={<UserProtectedRoute><Checkout /></UserProtectedRoute>} />
            <Route path="/profile" element={<UserProtectedRoute><Profile /></UserProtectedRoute>} />
            <Route path="/wishlist" element={<UserProtectedRoute><Wishlist /></UserProtectedRoute>} />
            <Route path="/orderdetails/:orderId" element={<UserProtectedRoute><OrderDetail /></UserProtectedRoute>} />
            <Route path="/authentication" element={<AdminLockRoute><UserLockRoute><CafeAuth /></UserLockRoute></AdminLockRoute>} />
            <Route path='/admin-login' element={<AdminLogin />} />
          </Route>
          {/* admin pages routing */}

          <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
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