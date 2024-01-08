import mongoose from "mongoose"
const messageSchema=new mongoose.Schema({
    chatId:{
        type:String,
        required:[true,"Chat id is required!"]
    },
    senderId:{
        type:String
    },
    text:{
        type:String
    }
},{
    timestamps:true
})

const Messages=new mongoose.model("Message",messageSchema)

export default Messages;