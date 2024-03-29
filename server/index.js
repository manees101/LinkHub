import express from "express"
import dotenv from "dotenv"
import connect from "./db/connect.js"
import "colors"
import bodyParser from "body-parser"
dotenv.config()
import authRouter from "./route/authRouter.js"
import userRouter from "./route/userRouter.js"
import postRouter from "./route/postRouter.js"
import imageRouter from "./route/imageRouter.js"
import cookieParser from "cookie-parser"
import chatRouter from "./route/chatRouter.js"
import messageRouter from "./route/messageRouter.js"
import cors from "cors"
import morgan from "morgan"
const app=express()
const PORT=process.env.PORT || 5000
const Mongo_URI=process.env.MONGO_URI
app.use(cookieParser())
app.use(express.json())
// app.use(morgan('combined'))
app.get("/",(req,res)=>{
  res.json("hellow world")
})
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/post",postRouter)
app.use("/api/v1/image",imageRouter)
app.use("/api/v1/chat",chatRouter)
app.use("/api/v1/message",messageRouter)
const start=async()=>{
   try
   {
       await connect(Mongo_URI)
       app.listen(PORT,()=>{
        console.log(`server is listening on port ${PORT}`.yellow.bold)
    })
   }
   catch(err)
   {
     console.log(`${err}`.red.bold)
   }
}
start()

