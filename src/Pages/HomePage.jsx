import React from 'react'
import MyNavbar from '../features/Navbar/Navbar'
import DoctorProfileForPatient from '../features/Patient/Components/DoctorProfileForPatient'
import { Outlet } from 'react-router-dom'

function HomePage() {
  return (
    <div>
      <MyNavbar/>      
      {/* <DoctorProfileForPatient/> */}
      <Outlet/>
    </div>
  )
}

export default HomePage
