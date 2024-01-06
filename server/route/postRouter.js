import express from "express";
import { createPost,deletePost,getPost,getAllPosts,likePost,getTimelinePosts } from "../controller/postController.js";
import auth from "../middleware/auth.js";
const postRouter=express.Router()
postRouter.route('/getAllPosts').get(getAllPosts)
postRouter.route("/").post(auth,createPost).get(auth,getTimelinePosts)
postRouter.route("/:id").get(auth,getPost).delete(auth,deletePost)
postRouter.route("/like/:postId").patch(auth,likePost)
export default postRouter