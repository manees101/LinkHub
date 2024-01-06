import User from "../models/userModel.js"
import mongoose from "mongoose"
import Post from "../models/postModel.js"

// =================== Post API Controllers ===========================
//create a new post 
const createPost = async (req, res) => {
    try {
        //   const {id}=req.params
        const postData = req.body
        const post = await Post.create({ ...postData })
        res.status(201).json({ success: true, postData: post })

    }
    catch (err) {
        res.status(400).json({ success: false, msg: err })
    }
}
//get all posts 
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        if (posts) {
            res.status(200).json({ success: true, postData: posts })
        }
        else {
            res.status(404).json({ success: false, msg: "No post found in DB" })
        }
    }
    catch (err) {
        res.status(500).josn({ success: false, err })
    }
}
// delete post
const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findOne({ _id: id })
        if (post) {
            await Post.deleteOne({ _id: id })
            res.status(200).json({ success: true, msg: "Post deleted successfully !" })
        }
        else {
            res.status(404).json({ success: false, msg: "Post not found" })
        }
    }
    catch (err) {

    }
}
//Get Post

const getPost = async (req, res) => {
    try {
        const { userId } = req.body
        const post = await Post.findOne({ _id: userId })
        if (post) {
            res.status(200).json({ success: true, postData: post })
        }
        else {
            res.status(404).json({ success: false, msg: "Post not found" })
        }
    }
    catch (err) {
        res.status(500).json({ success: false, err })
    }
}

//Like post

const likePost = async (req, res) => {
    try {
        const { postId } = req.params
        const userId = req.body.userId
        const post = await Post.findOne({ _id: postId })
        if(post.userId!==userId)
        {
            if (!post.likes.includes(userId)) {
                await post.updateOne({ $push: { likes: userId } })
                const updatedPost = await Post.findOne({ _id: postId })
                res.status(200).json({ success: true, msg: "Post liked" ,post:updatedPost})
            }
            else {
                await post.updateOne({ $pull: { likes: userId } })
                const updatedPost = await Post.findOne({ _id: postId })
                res.status(200).json({ success: true, msg: "Post unliked" ,post:updatedPost})
            }
        }
        else
        {
            res.status(403).json({success:false,msg:"You cannot like your own post"})
        }
      
    }
    catch (err) {
        res.status(500).json({ success: false, err })
    }
}
//get Time Posts
const getTimelinePosts = async (req, res) => {
    try {
        const  userId  = req.params.id
        const userPosts = await Post.find({ userId })
        const followingPosts = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                },
            }, {
                $lookup: {
                    from: "posts",
                    localField: "followings",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            }, {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }])
         
        if (userPosts && followingPosts) {
            res.status(200).json({ success: true, postData:userPosts.concat(followingPosts[0].followingPosts).sort((a,b)=>(b.createdAt-a.createdAt))})
        }
        else {
            res.status(404).json({ success: false, msg: "NO Post found in DB" })
        }
    }
    catch (err) {
        res.status(500).json({ success: false, msg: "Internal server error" })
    }
}

export { likePost, deletePost, createPost, getPost, getAllPosts, getTimelinePosts }