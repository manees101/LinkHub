import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    img:String,
    video:String,
    message:String,
    userId:{
        type:String,
        required:[true,"Author id required"]
    },
    likes:[String]
    // comments:[]
},
{
    timestamps: true
})


const Post=new mongoose.model("Post",postSchema)

export default Post