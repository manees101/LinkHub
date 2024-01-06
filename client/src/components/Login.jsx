import React, { useState } from 'react'
import authAPI from '../api/authAPI'
import { setUser, setToken } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Login() {

  const [username, setUsername] = useState("")
  //   const [email,setEmail]=useState("")
  const userData = useSelector(state => state.user.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await authAPI.login({ userData: { username, password } })
    dispatch(setUser({ userData: data.userData }))
    dispatch(setToken({ token: data.token }))
    userData ? navigate("../home") : navigate("../login")
  }
  return (
    <form action="/home" className='w-full h-full' method='post' onSubmit={handleSubmit}>
      <div className='w-full h-full '>
        <div className=' w-full h-1/5 flex justify-center items-center'>
          <h2 className='text-3xl font-bold'>Sign in</h2>
        </div>
        <div className='w-full h-3/5 flex gap-2 flex-wrap p-2 justify-center items-center'>
          <input type="text" name="username" id="username" placeholder='User name' value={username} onChange={(e) => setUsername(e.currentTarget.value)} className=' w-11/12 h-12 bg-gray-200 rounded-lg p-4 outline-none' />
          <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.currentTarget.value)} className='w-11/12 h-12 bg-gray-200 rounded-lg p-4 outline-none' />
        </div>

        <div className='w-full h-1/5 flex flex-col justify-center items-center gap-4 lg:flex-row'>
          
          <button className='w-24 h-10 text-xl text-white font-bold bg-amber-500 rounded-lg'>Sign in</button>
          <a href="/register">Don't have an account: <span className='font-bold underline'>Sign up</span> </a>
        </div>
      </div>
    </form>

  )
}

export default Login