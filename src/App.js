import React from 'react';
import Navbar from './features/Navbar/Navbar';
import { Route, Router, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import { BrowserRouter } from 'react-router-dom';
import DoctorLogin from './features/Doctor/Components/DoctorLogin';
import DoctorRegister from './features/Doctor/Components/DoctorRegister';
import Home from './features/Home/Home';
import { DoctorDashBoard } from './features/Doctor/Components/DoctorDashboard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route  element={<HomePage />} >
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<div/>}/>
          </Route>
          <Route path='/doctor/login' element={<DoctorLogin />} />
          <Route path='/doctor/register' element={<DoctorRegister />} />
          <Route path='/doctor/dashboard' element={<DoctorDashBoard />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
