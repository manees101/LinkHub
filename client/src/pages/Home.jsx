import React, { useEffect } from 'react'
import ProfileSide from '../components/ProfileSide'
import SharePost from '../components/SharePost'
import Post from '../components/Post'
import RightSide from '../components/RightSide'
import { setUser, setToken } from '../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import userAPI from '../api/userAPI'
import { useCookies } from 'react-cookie'
import postAPI from '../api/postAPI'
import { setPosts } from '../reducers/postReducer'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
function Home() {
  const userData = useSelector(state => state.user.userData)
  const postData = useSelector(state => state.post.postData)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [Cookies, setCookies] = useCookies(['token'])
  const loadData = async () => {
    const data = await userAPI.getUser(Cookies.token, navigate)
    dispatch(setUser({ userData: data }))
    dispatch(setToken({ token: Cookies.token }))
    if (data) {
      const result = await postAPI.getPosts(Cookies.token)
      console.log(result.data.postData)
      dispatch(setPosts({ postData: result.data.postData }))
    }
  }
  useEffect(() => {
    if (!userData) {
      loadData()
    }
  })
  return !userData ? (<Loader />) : (
    <div className='flex flex-row w-full h-screen gap-4 overflow-scroll scrollbar-hide relative'>
      <div className=' lg:w-3/12'>
        <ProfileSide />
      </div>
      <div className=' lg:w-3/6 h-screen flex flex-col gap-4 overflow-scroll scrollbar-hide relative'>
        <div className='w-full max-h-full mb-4 '>
          <SharePost />
        </div>
        <div className='w-full h-4/5'>
          {!postData ? (<Loader />) : (
            postData.map((post) => <Post key={post._id} {...{post}} />)
          )}
        </div>


      </div>
      <div className=' lg:w-3/12 h-full flex relative'>
        <RightSide />
      </div>
    </div>
  )
}

export default Home