import { useState } from 'react'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import { Provider, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useCookies } from "react-cookie"
function App() {
  const [Cookies, setCookies] = useCookies(['token'])
  return (
    <div className={` overflow-hidden #242d49 bg-slate-100 p-4 w-full h-screen`}>

      <div className=' absolute w-80 h-56 rounded-full bg-blue-200 blur-3xl -top-16 right-0'>

      </div>
      <div className=' absolute w-80 h-56 rounded-full bg-blue-200 blur-3xl top-1/3'>

      </div>
      <Routes>
        <Route path='/' element={Cookies.token ? <Navigate to="home" /> : <Navigate to="login" />} />
        <Route path='home' element={Cookies.token ? <Home /> : <Navigate to="../login" />} />
        <Route path="profile" element={Cookies.token ? <Profile /> : < Navigate to="../login" />} />
        <Route path='login' element={Cookies.token ? <Navigate to="../home" /> : <Signin />} />
        <Route path='register' element={<Signup />} />

      </Routes>
    </div>
  )
}

export default App
