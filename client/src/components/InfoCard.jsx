import React, { useEffect, useState } from 'react'
import { setUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import userAPI from '../api/userAPI'
import { useCookies } from 'react-cookie'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import imageAPI from '../api/imageAPI'
import {v1 as uuidv1} from "uuid"
function InfoCard() {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user.userData)
    const token = useSelector(state => state.user.token)
    const [image, setImage] = useState(null)
    const [Cookies, setCookies] = useCookies(['token'])
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState(userData?.name)
    const [username, setUsername] = useState(userData?.username)
    const [email, setEmail] = useState(userData?.email)
    const updateHandler = async () => {
        const updateData = {
            name,
            username,
            email
        }
        if (image) {
            const fileName = uuidv1()+'.'+ image.name.split(".")[1]
            console.log(fileName)
            await imageAPI.deleteImage(userData.profileImage.split(".")[0])
            await imageAPI.uploadImage(image,fileName.split(".")[0])
            updateData.profileImage = fileName
        }
        const updatedData = await userAPI.updateUser({ userData: { ...updateData }, token: Cookies.token })
        if (updatedData) {
            dispatch(setUser({ userData: updatedData }))
        }
        setImage(null)
    }
    return (

        <div className='w-full h-4/5 bg-white rounded-lg p-4 gap-2 flex flex-col'>
            {edit ? (<div className='w-full h-2/5 flex flex-col'>
                <label htmlFor="img" className='font-bold h-1/5'> Profile Picture</label>
                {image ? (
                    <div className='w-1/2 h-4/5 relative mx-auto'>
                        <img src={URL.createObjectURL(image)} alt="" className=' w-full h-full rounded-full mx-auto bg-cover' />
                        <div className='absolute hidden text-center hover:flex flex-col items-center justify-center top-0 left-0 hover:bg-gray-600 hover:opacity-70 w-full h-full rounded-full'>
                            <FontAwesomeIcon id='upload' icon={faUpload} className=' text-3xl text-black' />
                            <label htmlFor="upload" className='text-white'>upload</label>
                        </div>

                    </div>
                ) :
                    <input type="file" className='' name="image" accept='.jpg, .png' id="img" onChange={(e) => setImage(e.target.files[0])} />}

            </div>) : ''}

            <div className='w-full h-4/5 flex flex-col '>
                <div className=' w-full h-1/4 flex flex-col gap-2'>
                    <label htmlFor="name" className='font-bold'>
                        Name
                    </label>
                    <input type="text" name="name" id="name" value={name} readOnly={!edit}
                        className=' w-4/5 h-8'
                        onChange={(e) => { setName(e.currentTarget.value) }}
                    />

                </div>
                <div className=' w-full h-1/4 flex flex-col gap-2'>
                    <label htmlFor="username" className='font-bold'>
                        Username
                    </label>
                    <input type="text" name="username" id="username" readOnly={!edit} value={username}
                        className=' w-4/5 h-8'
                        onChange={(e) => { setUsername(e.currentTarget.value); setUpdateData((prev) => ({ ...prev, username })) }}
                    />

                </div>
                <div className=' w-full h-1/4 flex flex-col gap-2'>
                    <label htmlFor="email" className='font-bold'>
                        Email
                    </label>
                    <input type="email" name="email" id="email" readOnly={!edit} value={email}
                        className=' w-4/5 h-8'
                        onChange={(e) => { setEmail(e.currentTarget.value); setUpdateData((prev) => ({ ...prev, email })) }}
                    />
                </div>
                {/* <div className=' w-full h-1/5 flex flex-col gap-2'>
            <label htmlFor="password" className='font-bold'>
                Password
            </label>
            <input type="password" name="password" id="password" readOnly={!edit} value={password} 
             className=' w-4/5 h-8'
             onChange={(e)=>setPassword(e.currentTarget.value)}
            />                      
        </div> */}
                {edit ? (<button onClick={() => { setEdit((prev) => !prev); updateHandler() }}
                    className='w-20 h-10 bg-amber-500 font-bold rounded-lg' >Save</button>)
                    :
                    (
                        <button onClick={() => setEdit((prev) => !prev)}
                            className='w-20 h-10 bg-amber-500 font-bold rounded-lg' >Edit</button>
                    )}
            </div>


            {/* Success or failure message on save */}
        </div>
    )
}

export default InfoCard