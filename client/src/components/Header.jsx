import React from 'react'
import appLogo from "../assets/images/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import {useNavigate} from "react-router-dom"
function Header() {
  const navigate=useNavigate();
  const searchHandler=()=>{

  }
  return (
    <div className='flex'>
      <img src={appLogo} alt="logo" className='h-9 w-10 mt-3 cursor-pointer' onClick={()=>navigate('/home')} 
      
      />
      <div className=' w-54 h-8  flex m-4 '>
        <input type="text" placeholder='#Explore' className=' ml-1 p-2' onChange={searchHandler}/>
        <div className='w-8 h-8 bg-amber-400 rounded-sm flex justify-center items-center'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='
              w-6 h-6 ml-0 bg-amber-400 rounded-sm
            ' />
        </div>

      </div>
    </div>
  )
}

export default Header