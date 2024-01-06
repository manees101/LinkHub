import express from "express";
import auth from "../middleware/auth.js";
const authRouter=express.Router()
import {login,register,logout} from "../controller/authController.js"

authRouter.route("/register").post(register)
authRouter.route("/login").post(login)
authRouter.route("/logout").delete(auth,logout)

export default authRouter