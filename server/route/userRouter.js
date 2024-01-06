import express from "express"
import { getUser,updateUser,deleteUser,followUser,unFollowUser,getAllUsers,getFollowers } from "../controller/userController.js"
import auth from "../middleware/auth.js"
const userRouter=express.Router()

userRouter.route("/").get(auth,getUser).patch(auth,updateUser).delete(auth,deleteUser)
userRouter.route("/follow").patch(auth,followUser)
userRouter.route("/unfollow").patch(auth,unFollowUser)
userRouter.route("/getAllUsers").get(auth,getAllUsers) //to be deleted
userRouter.route("/getFollowers/:id").get(getFollowers)
export default userRouter