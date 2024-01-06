import axios from "axios";
const postAPI=axios.create()
postAPI.createPost=async(data,token)=>{
    try
    {
       return await postAPI.post("api/v1/post",data,{
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
postAPI.getPosts=async(token)=>{
    try
    {
        return await postAPI.get(`api/v1/post`,{
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
postAPI.likePost=async(postId,userId,token)=>{
    try
    {
       return await postAPI.patch(`api/v1/post/like/${postId}`,{userId},{
        headers:{
            Authorization:`Bearer ${token}`
        }
       })
    }
    catch(err)
    {
        console.log(err)
        return err
    }
}
export default postAPI