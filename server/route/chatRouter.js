import express from "express"
const chatRouter=new express.Router()
import {createChat,userChats,findChats} from "../controller/chatController.js"
chatRouter.route("/").post(createChat)
chatRouter.route("/:userId").get(userChats)
chatRouter.route("/find/:senderId/:recieverId").get(findChats)

export default chatRouter;