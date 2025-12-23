import React from 'react'
import Header from '../website/component/Header'
import Footer from '../website/component/Footer'
import { Outlet } from 'react-router-dom'

function WebsiteLayout() {
  return (
   <>
   <Header/>
   <Outlet/>
   <Footer/>
   </>
  )
}

export default WebsiteLayout