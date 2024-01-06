import React, { useEffect, useState } from 'react'
import Logo from './Header'
import ProfileCard from './ProfileCard'
import FollowersCard from './FollowersCard'
import { useSelector } from 'react-redux'
import userAPI from '../api/userAPI'
function ProfileSide() {
  const userData = useSelector(state => state.user.userData)
  const token=useSelector(state => state.user.token)
  const [users,setUsers]=useState(null)
  const loadAllUsers=async()=>{
    const usersData=await userAPI.getAllUsers(token)
    setUsers(usersData)
   
  }
  useEffect(()=>{
    if(!users)
    {
      loadAllUsers()  
    }
    
  })
  return (
    <div className='flex flex-col gap-4 items-center overflow-scroll h-full scrollbar-hide'>
      <div className=' w-full h-1/5'>
        <Logo />
      </div>
      <div className='w-full h-3/5'>

        <ProfileCard {...{ profileImage:userData?.profileImage,name: userData.name, username: userData.username, followers: userData.followers.length, followings: userData.followings.length }} />
      </div>
      <div className=' w-full h-1/5 flex flex-col gap-4'>
        <h3>People you may like</h3>
       {users?.map((user)=>{
        if(user._id!==userData._id)
        {
          return <FollowersCard key={user._id} {...{id:user._id,name:user.name,username:user.username,profileImage:user.profileImage}}/>
        }
       })}
      </div>
    </div>
  )
}

export default ProfileSide