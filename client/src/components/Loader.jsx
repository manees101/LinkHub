import React from 'react'
import "./loader.css"
function Loader() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
         <div className="lds-ripple"><div></div><div></div></div>
    </div>
   
  )
}

export default Loader