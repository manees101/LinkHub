import React,{useState,useEffect} from 'react'
import img from "../assets/images/img2.png"
import { useCookies } from 'react-cookie'
import imageAPI from '../api/imageAPI'
import userAPI from '../api/userAPI'
import { useSelector,useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
function FollowersCard({id,name,username,profileImage }) {
  const [Cookies,setCookies]=useCookies(['token'])
  const [image,setImage]=useState(null)
  const userData=useSelector(state=>state.user.userData)
  const dispatch=useDispatch()
  const isFollowing=userData.followings.includes(id)
  const loadImage=async()=>{
       if(profileImage)
       {
         const img=await imageAPI.getImage(profileImage.split(".")[0])
         setImage(img.href)
       }
  }
  useEffect(()=>{
      loadImage()
  },[profileImage])
  const handleFollow=async()=>{
     const result=await userAPI.followUser(id,Cookies.token)
     dispatch(setUser({userData:result.data.userData}))
  }
  const handleUnFollow=async()=>{
    const result=await userAPI.unFollowUser(id,Cookies.token)
    dispatch(setUser({userData:result.data.userData}))
  }
  
  return (
    
      <div className='flex w-4/5 h-20 items-center'>
        <div className=' w-1/4'>
          <img src={image ? image:img} alt="" className='rounded-full' />
        </div>
        <div className='flex flex-col justify-center items-center w-2/4'>
          <h2>{name}</h2>
          <h2>{username}</h2>
        </div>
        {isFollowing ? (
           <div className='w-1/4  
           cursor-pointer
            text-orange-500 rounded-lg
            h-3/5 flex justify-center 
             items-center
              text-md
             ' onClick={handleUnFollow}>
           <h2>Following</h2>
         </div>
        ):(
           <div className='w-1/4  
           cursor-pointer bg-orange-400
            text-white rounded-lg
            h-3/5 flex justify-center 
             items-center
              text-lg
             ' onClick={handleFollow}>
           <h2>Follow</h2>
         </div>
        )}
       
      </div>

  )
}

export default FollowersCard