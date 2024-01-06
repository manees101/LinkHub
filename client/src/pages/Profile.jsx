import React,{useEffect} from 'react'
import Header from '../components/Header'
import RightSide from '../components/RightSide'
import InfoCard from '../components/InfoCard'
import FollowersCard from '../components/FollowersCard'
import ProfileCard from '../components/ProfileCard'
import { setUser,setToken } from '../reducers/userReducer'
import { setPosts } from '../reducers/postReducer'
import { useSelector,useDispatch } from 'react-redux'
import userAPI from '../api/userAPI'
import postAPI from '../api/postAPI'
import { useCookies } from 'react-cookie'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
function Profile() {
  const navigate=useNavigate()
  const userData=useSelector(state=>state.user.userData)
  const dispatch=useDispatch()
  const [Cookies,setCookies]=useCookies(['token'])
  const loadData=async()=>{
    const data=await userAPI.getUser(Cookies.token,navigate)
    dispatch(setUser({userData:data}))
    dispatch(setToken({token:Cookies.token}))
    if(data)
    {
      const result=await postAPI.getPosts(Cookies.token)
    dispatch(setPosts({postData:result.data.postData}))
    }
}
useEffect(()=>{
  if(!userData)
  {
    loadData()
  }
})
  return !userData ? <Loader/> : (
    <div className='flex flex-row w-full h-screen gap-4 overflow-scroll scrollbar-hide relative'>
   <div className=' w-3/12 h-full flex flex-col gap-4 overflow-scroll scrollbar-hide'>
    <Header/>
    <InfoCard/>
   </div>
   <div className=' w-3/6 h-screen flex flex-col gap-4 overflow-scroll scrollbar-hide'>
   {/* <SharePost/> */}
   <ProfileCard {...{name:userData.name,username:userData.username,followers:userData.followers.length,followings:userData.followings.length,profileImage:userData.profileImage}}/>
     </div>
   <div className=' w-3/12 h-full flex'>
    <RightSide/>
   </div>
   </div>
  )
}

export default Profile