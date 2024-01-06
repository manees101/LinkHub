import React, { useEffect, useState } from 'react'
import { faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import imageAPI from '../api/imageAPI'
import { useCookies } from 'react-cookie'
import postAPI from '../api/postAPI'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setPosts } from '../reducers/postReducer'
function Post({
   post
}) {
    const [image, setImage] = useState(null)
    const userData = useSelector(state => state.user.userData)
    let postData=useSelector(state=>state.post.postData)
    const dispatch=useDispatch()
    const [Cookies, setCookies] = useCookies(['token'])
    const handleLikes = async () => {
        const result = await postAPI.likePost(post._id, userData._id, Cookies.token)
        if (result?.response?.status == 403) {
        return
        }
       if(result.status==200)
       {

         postData=postData.map((post)=>(post._id===result.data.post._id ? result.data.post : post))
          dispatch(setPosts({postData}))
       }
    }
    const loadImage = async () => {
        if (post.img) {
            const imgResponse = await imageAPI.getImage(post.img.split(".")[0])
            setImage(imgResponse.href)
        }
    }
    const handleShare = () => {

    }
    const handleComment = () => {

    }
    useEffect(() => {
        loadImage()
    }, [post.img])
    return (
        <div className=' max-w-full max-h-full bg-white rounded-lg text-black flex flex-col justify-center items-center p-5 gap-4 mt-4'>
            {image && (<div className=' w-full h-4/5 rounded-lg flex justify-center items-center object-cover overflow-auto'>
                <img src={image} alt={post.img} className='bg-cover w-full h-full rounded-lg' />
            </div>
            )}
            <div className='w-full h-1/5 flex flex-col gap-2'>
                <div className='w-11/12 overflow-scroll scrollbar-hide'>
                    <p className=' break-words'>{post.message}</p>
                </div>
                <div className='flex justify-around w-full'>
                    <FontAwesomeIcon icon={faHeart} className={`w-5 h-5 ${post.likes.includes(userData._id) ? 'text-red-500 cursor-pointer' : 'text-black cursor-pointer'}`} onClick={handleLikes} />
                    <FontAwesomeIcon icon={faComment} className='w-5 h-5 text-black cursor-pointer' onClick={handleComment} />
                    <FontAwesomeIcon icon={faShare} className='w-5 h-5 text-black cursor-pointer' onClick={handleShare} />
                </div>
                <div className=' text-gray-400 w-11/12'>
                    <p>{post.likes.length} likes</p>
                </div>
            </div>

        </div>
    )
}

export default Post