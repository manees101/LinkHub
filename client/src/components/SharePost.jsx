import React, { useRef, useState,useEffect } from 'react'
import img from "../assets/images/img1.png"
import { faImage, faVideo, faLocationDot, faCalendarDays, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../reducers/postReducer'
import postAPI from '../api/postAPI'
import imageAPI from '../api/imageAPI'
import {v1 as uuidv1} from "uuid"
function SharePost() {
    const imageRef = useRef()
    const videoRef = useRef()
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user.userData)
    const token = useSelector(state => state.user.token)
    const postData = useSelector(state => state.post.postData)
    const dateref = useRef()
    const [desc, setDesc] = useState("")
    const [image, setImage] = useState(null)
    const [video, setVideo] = useState('')
    const [isClicked, setClicked] = useState(false)
    const [profileImg,setProfileImg]=useState(null)
    const onImageChange = (e) => {
        setVideo("")
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0]
            setImage(img)
        }
    }
    const onVideoChange = (e) => {
        setImage(null)
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                setVideo(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }
    const handleSubmit = async (e) => {
        // e.preventDefault()
        const newPost = {
            userId: userData._id,
            message: desc
        }
        if (image) {
            const fileName = uuidv1()+'.'+ image.name.split(".")[1]
            newPost.img = fileName
            console.log(fileName)
            await imageAPI.uploadImage(image,fileName.split(".")[0])
        }
        const result = await postAPI.createPost(newPost, token)
        if (result.status == 201) {
            dispatch(addPost({ postData: result.data.postData }))
        }
        setClicked(false)
        setDesc("")
        location.reload()
    }
    const loadImage=async()=>{
        if(userData.profileImage)
        {
          const img=await imageAPI.getImage(userData.profileImage)
          setProfileImg(img.href)
        }
   }
   useEffect(()=>{
       loadImage()
   })
    return (
        <div className=' w-full h-full' >
            <div className='w-full h-36 bg-white flex flex-col items-center justify-center gap-2 rounded-lg'>
                <div className=' w-full h-3/5 flex justify-center items-center'>
                    <div className=' w-1/6 h-full flex items-center justify-center'>
                        <img src={profileImg ? profileImg : img} alt="profile_img" className=' w-12 h-12 rounded-full' />
                    </div>
                    <div className=' w-9/12 h-full flex items-center'>
                        <input type="text" name="share" required value={desc} onChange={(e) => setDesc(e.currentTarget.value)} placeholder='What is happening ?' className=' bg-slate-200 h-1/2 w-full p-4 rounded-xl' />
                    </div>
                </div>
                <div className='w-full h-2/5 flex justify-around'>
                    <div>
                        <input className=' hidden' type="file" accept='.jpg,.png' ref={imageRef} onChange={onImageChange} />
                        {/* <input type="date" className={isClicked ? "" : "hidden"} ref={dateref} onChange={()=>setClicked((prev)=>!prev)} /> */}
                        <input type="file" accept="video/*" onChange={onVideoChange} ref={videoRef} style={{ display: 'none' }}
                        />
                    </div>
                    <div className='flex justify-around w-2/5 '>
                        <FontAwesomeIcon icon={faImage} className=' w-6 h-6 text-green-500 cursor-pointer' onClick={() => imageRef.current.click()} />
                        <FontAwesomeIcon icon={faVideo} className=' w-6 h-6  text-purple-500 cursor-pointer' onClick={() => videoRef.current.click()} />
                        <FontAwesomeIcon icon={faCalendarDays} className=' w-6 h-6 text-orange-500 cursor-pointer' onClick={() => dateref.current.click()} />
                    </div>
                    <button className=' bg-amber-500 text-white w-20 rounded-xl h-10 text-lg' onClick={() => { setClicked(true); handleSubmit() }}>{isClicked ? "Sharing..." : "Share"}</button>
                </div>

            </div>
            {image && <div className=' w-4/5 h-5/6 py-14 mx-auto'>
                <FontAwesomeIcon icon={faTrash} className=' w-6 h-6 text-red-500 cursor-pointer' onClick={() => setImage(null)} />
                <img src={URL.createObjectURL(image)} alt="post_img" className=' w-full h-full mx-auto' />
            </div>}
            {video && <div className='w-4/5 h-5/6 py-14 mx-auto '>
                <FontAwesomeIcon icon={faTrash} className=' w-6 h-6 text-red-500 cursor-pointer' onClick={() => setVideo('')} />
                <video src={video} controls className='w-full h-full mx-auto bg-black'></video>
            </div>}
        </div>

    )
}

export default SharePost