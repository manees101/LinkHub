import Messages from "../models/messageModel.js";
const addMessage=async(req,res)=>{
    try
    {
      const {chatId,senderId,text}=req.body
      const newMessage=await Messages.create({
        chatId,
        senderId,
        text
      })
      res.status(201).json({success:true,messageData:newMessage})

    }
    catch(err)
    {
        res.status(500).json({err})
    }
}
const getMessages=async(req,res)=>{
    try
    {
       const {chatId}=req.params
       const messages=await Messages.find({chatId})
       res.status(200).json({success:true,messages})
    }
    catch(err)
    {
        res.status(500).json({success:false,err})
    }
}
export {addMessage,getMessages}