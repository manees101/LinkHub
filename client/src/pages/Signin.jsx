import React from 'react'
import Logo from "../assets/images/logo.png"
import Login from '../components/Login'
function Signin() {
  return (
    <div className='w-full h-full flex justify-center items-center gap-4 relative'>
      <div className='w-2/5  h-3/5 flex justify-center items-center gap-4'>
        <img src={Logo} alt="Logo" className='w-17 h-16 ' />
        <h2 className='text-4xl font-bold text-amber-500'>LinkHub</h2>
      </div>
      <div className=' w-2/5 h-3/5 bg-white rounded-lg'>
        <Login />
      </div>
    </div>
  )
}

export default Signin