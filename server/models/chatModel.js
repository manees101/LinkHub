import mongoose from "mongoose"
const chatSchema=new mongoose.Schema({
    members:{
        type:Array
    }
},{
    timestamps:true
})

const Chats=new mongoose.model("Chat",chatSchema)

export default Chats;