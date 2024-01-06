import express from "express"
import auth from "../middleware/auth.js"
const imageRouter=express.Router()
import { uploadImage,getImage } from "../controller/imageController.js"
imageRouter.route("/uploadImage").post(auth,uploadImage)
imageRouter.route("/:imageName").get(auth,getImage)

export default imageRouter