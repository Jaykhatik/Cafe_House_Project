import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebsiteLayout from './layouts/WebsiteLayout';
import Index from './website/pages';
import Menu from './website/pages/menu';
import Contact from './website/pages/contact'
import Today_special from './website/pages/today_special'
// import AdminLayout from './layouts/AdminLayout';
// import Dashboard from './Admin/pages/dashboard';
// import MenuItems from './Admin/pages/MenuItem';
// import Inventory from './Admin/pages/Inventory';
// import Reservations from './Admin/pages/reservation';





function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<WebsiteLayout />}>
            <Route path="/" element={<><Index /></>} />
            <Route path="/menu" element={<><Menu /></>} />
            <Route path='/today_special' element={<><Today_special /></>} />
            <Route path='/Contact' element={<><Contact /></>} />
          </Route>
          {/* admin pages routing */}

          {/* <Route path='/admin' element={<AdminLayout/>}>
            <Route path='dashboard' element={<Dashboard/>} />
            <Route path='menu' element={<MenuItems/>} />
            <Route path='inventory' element={<Inventory/>}/>
            <Route path='reservations' element={<Reservations/>} />
          </Route> */}
        </Routes>
      </Router>

    </>
  );
}

export default App;
