import React, { useEffect, useState } from 'react'
import ProfileCover from "../assets/images/cover.jpg"
import dummyProfile from "../assets/images/dummy-profile.png"
import imageAPI from '../api/imageAPI'
import { useCookies } from 'react-cookie'
function ProfileCard(
    {
        name,
        followers,
        followings,
        profileImage=null,
        cover
    }
) {
    const [Cookies,setCookies]=useCookies(['token'])
    const [image,setImage]=useState(null)
    const loadImage=async()=>{
         if(profileImage)
         {
           const img=await imageAPI.getImage(profileImage)
           setImage(img.href)
         }
    }
    useEffect(()=>{
        loadImage()
    },[profileImage])
    return (
        <div className='flex flex-col w-full bg-white h-auto md:h-96 shadow-lg rounded-xl overflow-hidden'>
            <div className='w-full h-2/4 relative'>
                <img src={ProfileCover} alt="profile cover" className='w-full h-4/5 object-cover' />
               {image ? (<img src={image} alt="profile" className='absolute w-20 h-20 top-20 left-1/2  md:top-40 md:left-1/2 sm:top-24 sm:left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white md:h-32 md:w-32 object-cover sm:h-24 sm:w-24' />)
               :
               (<img src={dummyProfile} alt="profile" className='absolute w-20 h-20 top-20 left-1/2  md:top-40 md:left-1/2 sm:top-24 sm:left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white md:h-32 md:w-32 object-cover sm:h-24 sm:w-24' />)
               } 
            </div>
            <div className='mt-6 md:mt-8 mb-3 w-full flex justify-center items-center flex-col text-gray-950'>
                <h2 className='text-xl font-bold'>{name}</h2>
            </div>
            <div className='my-1 h-0.5 w-full bg-gray-500'></div>
            <div className='flex items-center justify-center w-full'>
                <div className='flex flex-col w-1/2 md:w-2/4 justify-center items-center'>
                    <h4 className='text-lg font-bold'>
                        {followers}
                    </h4>
                    <h4 className='text-sm'>
                        Followers
                    </h4>
                </div>
                <div className='mx-1 h-10 w-0.5 bg-black'></div>
                <div className='flex flex-col w-1/2 md:w-2/4 justify-center items-center'>
                    <h4 className='text-lg font-bold'>
                        {followings}
                    </h4>
                    <h4 className='text-sm'>
                        Followings
                    </h4>
                </div>
            </div>
            <div className='my-1 h-0.5 w-full bg-gray-500'></div>
            <div className='flex items-center justify-center w-full'>
                <button className='text-amber-500 text-lg md:text-xl' >My Profile</button>
            </div>
        </div>
    )
}

export default ProfileCard