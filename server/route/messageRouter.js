import express from "express"
import { addMessage,getMessages } from "../controller/messageController.js"
const messageRouter=new express.Router()

messageRouter.route("/").post(addMessage)
messageRouter.route("/:chatId").get(getMessages)

export default messageRouter;