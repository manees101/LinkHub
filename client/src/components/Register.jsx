import React, { useState } from 'react'
import validator from "validator"
import { useDispatch } from "react-redux"
import authAPI from '../api/authAPI'
import { setUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
function Register() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPass, setConfPass] = useState("")
  const [passMatch, setPassMatch] = useState(true)
  const [isCorrectEmail, setIsCorrectEmail] = useState(true)
  const [isStrongPassword, setIsStrongPass] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    password !== confPass ? setPassMatch(false) : setPassMatch(true)
    validator.isEmail(email) ? setIsCorrectEmail(true) : setIsCorrectEmail(false)
    validator.isStrongPassword(password) ? setIsStrongPass(true) : setIsStrongPass(false)

    const userData = await authAPI.register({ userData: { username, email, password, confPass, name } })
    dispatch(setUser({ userData }))
    userData ? navigate("../home") : navigate("/")
  }
  return (
    <form action="/signup" className='w-full h-full' method='post' onSubmit={handleSubmit}>
      <div className='w-full h-full '>
        <div className=' w-full h-1/5 flex justify-center items-center'>
          <h2 className='text-3xl font-bold'>Sign up</h2>
        </div>
        <div className='w-full h-3/5 flex gap-2 flex-wrap p-2 justify-center '>
          <input type="text" name="name" id="name" placeholder='Full Name' value={name} onChange={(e) => setName(e.currentTarget.value)} className=' w-2/5 h-12 bg-gray-200 rounded-lg p-4 outline-none' />
          <input type="text" name="username" id="username" placeholder='User name' value={username} onChange={(e) => setUsername(e.currentTarget.value)} className='w-2/5 h-12 bg-gray-200 rounded-lg p-4 outline-none' />
          <input type="email" name="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.currentTarget.value)} className=' w-4/5 h-12 bg-gray-200 rounded-lg p-4 outline-none' />
          {isCorrectEmail ? "" : <h3 className='text-red-500 w-full text-center'>Email formate is not correct</h3>}
          <br />
          <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.currentTarget.value)} className='w-2/5 h-12 bg-gray-200 rounded-lg p-4 outline-none' />
          <input type="password" name="confPassword" id="confPassword" placeholder='Confirm Password' value={confPass} onChange={(e) => setConfPass(e.currentTarget.value)} className='w-2/5 h-12 bg-gray-200 rounded-lg p-4 outline-none' />
          {passMatch ? "" : <h3 className='text-red-500 '>Password does not match</h3>}
          {isStrongPassword ? "" : <h3 className='text-red-500 '>Please choose a strong password</h3>}
        </div>

        <div className='w-full h-1/5 flex flex-col justify-center items-center gap-4 lg:flex-row'>

          <button className='w-24 h-10 text-xl text-white font-bold bg-amber-500 rounded-lg'>Sign up</button>
          <a href="/login">Already have an account: <span className='font-bold underline'>Sign in</span> </a>
        </div>
      </div>
    </form>

  )
}

export default Register