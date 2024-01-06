import React, { useEffect, useState } from 'react'
import { faMessage, faGear, faArrowTrendUp, faBell, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { setUser, setToken } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import authAPI from '../api/authAPI'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function RightSide() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(state => state.user.token)
  const [trendsData,setTrends]=useState(null)
  const logoutHandler = async () => {
    await authAPI.logout(token)
    dispatch(setUser({ userData: null }))
    dispatch(setToken({ token: null }))
  }

  const loadTrands=async()=>{
     const trends=await axios.get(`https://twitter-trends-by-location.p.rapidapi.com/location/d476c7ff73003334ad5a8e9830743ec3`,{
      headers:{
        'X-RapidAPI-Key': 'b8ebc347eamshdb1a7a016f3d615p11ef94jsnf10cc05c81d7',
    'X-RapidAPI-Host': 'twitter-trends-by-location.p.rapidapi.com'
      }
     })
   setTrends(trends.data.trending.trends)
    console.log(trendsData)
  }
  useEffect(()=>{
    loadTrands()
  },[])
  return (

    <div className="h-full w-full flex flex-col items-center gap-4 relative">
      <div className=" w-full h-1/5 flex justify-around">
        <FontAwesomeIcon icon={faGear} className="w-6 h-6 cursor-pointer  hover:text-amber-500" onClick={() => { navigate("../profile") }} />
        <FontAwesomeIcon icon={faBell} className=" w-6 h-6 cursor-pointer  hover:text-amber-500" />
        <FontAwesomeIcon icon={faMessage} className="w-6 h-6 cursor-pointer  hover:text-amber-500" />
        <FontAwesomeIcon icon={faRightFromBracket} className="w-6 h-6 cursor-pointer  hover:text-amber-500" onClick={logoutHandler} />
      </div>
      <div className=" w-11/12 h-4/6 bg-white rounded-lg p-8">
        <h2 className=" text-2xl mb-8 font-bold">Twitter Trends in your country</h2>
        <div>
          <h3 className="font-bold">#AOT</h3>
          <p className="text-sm text-gray-500">93k likes</p>
        </div>
      </div>
    </div>
  )
}

export default RightSide