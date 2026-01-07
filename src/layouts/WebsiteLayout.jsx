import React from 'react'
import Header from '../website/component/Header'
import Footer from '../website/component/Footer'
import { Outlet } from 'react-router-dom'
import Topbar from '../website/component/Topbar'

function WebsiteLayout() {
  return (
   <>
   <Topbar/>
   <Header/>
   <Outlet/>
   <Footer/>
   </>
  )
}

export default WebsiteLayout