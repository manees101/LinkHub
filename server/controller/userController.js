import User from "../models/userModel.js"
import bcryptjs  from "bcryptjs"
import Post from "../models/postModel.js"
import validator from "validator"

// =============> User API Methods <=================

//Get User
const getUser=async(req,res)=>{
    try
    {
      const {id}=req.params
 
      const userData=await User.findOne({_id:id})
 
         res.status(200).json({success:true,userData})
    }
    catch(err)
    {
      res.status(400).json({success:false,msg:err})
    }
 }
 
 //Update User
 const updateUser=async(req,res)=>{
     try
     {
         const {id}=req.params
         const {updateData}=req.body
        const password=updateData.password
        if(password)
        {
         if(!validator.isStrongPassword(password))
         {
             res.status(400).json({success:false,msg:"Please choose a strong password"})
             return
         }
         else
         {
             const hashPass=await bcryptjs.hash(password,10)
             updateData.password=hashPass
         }
        }
        const user=await User.findByIdAndUpdate({_id:id},{...updateData},{new:true})
        if(user)
        {
         res.status(200).json({success:true,userData:user})
        }    
        else
        {
         res.status(400).json({success:false,msg:"Something went wrong"})
        }
     }
     catch(err)
     {
         res.status(500).json({success:false,msg:"Intenal server error"})
     }
     
 }
 //Delete User
 const deleteUser=async(req,res)=>{
     try
     {
        const {id}=req.params
        const deleted=await User.deleteOne({_id:id})
 
        res.status(200).json({success:true,data:deleted})
     }
     catch(err)
     {
         res.status(500).json({success:false,err})
     }
 }
 //Follow a user
 const followUser=async(req,res)=>{
      try
      {
         const {followUserId}=req.body
         const {id}=req.params
         const followingUser=await User.findOne({_id:id})
         const followUser=await User.findOne({_id:followUserId})
         if(!followingUser.followings.includes(followUserId))
         {
             await followingUser.updateOne({$push:{followings:followUserId}})
             await followUser.updateOne({$push:{followers:id}})
             const userData=await User.findOne({_id:id})
             res.status(200).json({success:true,msg:"User followed!",userData})
         }
        else
        {
         res.status(403).json({success:false,msg:"User already followed by you"})
        }
      }
      catch(err)
      {
         res.status(500).json({success:false,err})
      }
 }
 
 //Un Follow a user
 const unFollowUser=async(req,res)=>{
     try
     {
        const {followUserId}=req.body
        const {id}=req.params
        const followingUser=await User.findOne({_id:id})
        const followUser=await User.findOne({_id:followUserId})
       
        if(followingUser.followings.includes(followUserId))
        {
            await followingUser.updateOne({$pull:{followings:followUserId}})
            await followUser.updateOne({$pull:{followers:id}})
            const userData=await User.findOne({_id:id})
            res.status(200).json({success:true,msg:"User Unfollowed!",userData})
        }
       else
       {
        res.status(403).json({success:false,msg:"User is not followed by you"})
       }
     }
     catch(err)
     {
        res.status(500).json({success:false,err})
     }
 }
//get all users
const getAllUsers=async(req,res)=>{
    try
    {
       const users=await User.find()
       res.status(200).json({success:true,usersData:users})
    }
    catch(err)
    {
        res.status(500).json({success:false,err})
    }
}
//get Followers
const getFollowers=async(req,res)=>{
    try
    {
          const {id}=req.params
          const user=await User.findOne({_id:id})
          const followersList=user.followers?.map(async(followerId)=>await User.findOne({_id:followerId}))
    res.status(200).json({success:true,followersList})
    }
    catch(err)
    {
        res.status(500).json({success:false,err})
    }
}
 export {getUser,updateUser,deleteUser,followUser,unFollowUser,getAllUsers,getFollowers}