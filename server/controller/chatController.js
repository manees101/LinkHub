import Chats from "../models/chatModel.js";
const createChat=async(req,res)=>{
    try
    {
      const newChat=await Chats.create({
        members:[req.body.senderId,req.body.recieverId]
      })
      res.status(401).json({success:true,chat:newChat})
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}
const userChats=async(req,res)=>{
    try
    {
       const userChats=await Chats.find({
        members:{
            $in:[req.params.userId]
        }
       })
       res.status(200).json({success:true,userChats})
    }
    catch(err)
    {
        res.status(500).json({success:false,err})
    }
}
const findChats=async(req,res)=>{
    try
    {
        const chats=await Chats.findOne({
            members:{
                $all:[req.params.senderId,req.params,recieverId]
            }
        })
        res.status(200).json({success:true,chats})
    }
    catch(err)
    {
        res.status(500).json({success:false,err})
    }
}
export {createChat,userChats,findChats}