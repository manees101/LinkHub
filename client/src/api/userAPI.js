import axios from "axios";
const userAPI=axios.create()
userAPI.getUser=async(token,navigate)=>{
    try
    {
        if(token)
        {
            const result=await userAPI.get(`/api/v1/user`,{
                headers: {
                    Authorization:`Bearer ${token}`
                }})
            return result.data.userData
        }
     else
     {
        console.log("No token found in cookies")
     }
    }
    catch(err)
    {

        // console.log(err)
        navigate('/login')
    }
}
userAPI.updateUser=async({userData,token})=>{
    try
    {
        if(token)
        {
            const updatedData=await userAPI.patch("/api/v1/user",{updateData:userData},{
                headers: {
                    Authorization:`Bearer ${token}`
                }})
                // console.log( updatedData)
                return updatedData.data.userData
        }
     else
     {
        console.log("No token found in cookies")
     }
    }
    catch(err)
    {
        console.log(err)
    }
}
userAPI.getAllUsers=async(token)=>{
    try
    {
       const result= await userAPI.get("/api/v1/user/getAllUsers",{
        headers:{
            Authorization:`Bearer ${token}`
        }
       })
       return result.data.usersData
    }
    catch(err)
    {
        console.log(err)
    }
}
userAPI.followUser=async(followUserId,token)=>{
    try
    {
       const result=await userAPI.patch("/api/v1/user/follow",{followUserId},{
        headers:{
            Authorization:`Bearer ${token}`
        }
       })
       return result
    }
    catch(err)
    {
        console.log(err)
    }
}
userAPI.unFollowUser=async(followUserId,token)=>{
    try
    { 
        const result=await userAPI.patch("/api/v1/user/unfollow",{followUserId},{
            headers:{
                Authorization:`Bearer ${token}`
            }
           })
          return result
    }
    catch(err)
    {
        console.log(err)
    }
}
export default userAPI