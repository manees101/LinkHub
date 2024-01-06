import jsonwebtoken from "jsonwebtoken"
import User from "../models/userModel.js"
const auth=async(req,res,next)=>{
    try
    {
       const {authorization}=req.headers
       if(authorization && authorization.startsWith("Bearer"))
       {
          const token=authorization.split(" ")[1]
          const verifyToken=jsonwebtoken.verify(token,process.env.SECRET_KEY) 
          const user=await User.findOne({_id:verifyToken._id})
          if(user)
          {
            if(!user.verifyToken(token))
            {
              res.status(403).json({success:false,msg:"Token does not exit. Please login"})
            }
            else
            {
              req.params.id=verifyToken._id
            
              next()
            }
          }
         else
         {
          res.clearCookie("token");
          res.status(404).json({success:false,msg:"User does not exist"})
         }
       }
       else
       {
        res.status(400).json({success:false,msg:"Please provide token"})
       }
    }
    catch(err)
    {
    throw err
    }
}

export default auth