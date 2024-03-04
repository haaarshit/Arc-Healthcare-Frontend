import React from 'react'
import MyNavbar from '../features/Navbar/Navbar'
import DoctorProfileForPatient from '../features/Patient/Components/DoctorProfileForPatient'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

function HomePage() {
  return (
    <div>
      <MyNavbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default HomePage
