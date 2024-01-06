import axios from "axios"

const authAPI=axios.create()
authAPI.login=async({userData})=>{
    try
    {
    
       const result=await axios.post("https://link-hub-server.vercel.app/api/v1/auth/login",userData)
       document.cookie=`token=${result.data.token}`
       return result.data
    }   
    catch(err)
    {
        console.log(err)
    }
}
authAPI.register=async({userData})=>{
    try
    {
       const result=await authAPI.post("https://link-hub-server.vercel.app/api/v1/auth/register",userData)
       document.cookie=`token=${result.data.token}`
       return result.data.userData
    }
    catch(err)
    {
        console.log(err)
    }
}
authAPI.logout=async(token)=>{
    try
    {
      await authAPI.delete(`https://link-hub-server.vercel.app/api/v1/auth/logout`,{
        headers:{   
            Authorization:`Bearer ${token}`
        }
      })
    }
    catch(err)
    {
        console.log(err)
    }
}
export default authAPI