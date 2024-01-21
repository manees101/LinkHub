import User from "../models/userModel.js"
import bcryptjs  from "bcryptjs"
import validator from "validator"

//==================== Authentication API methods =======================

//Register user
const register=async(req,res)=>{
    try
    {
        const {name,username,password,confPass,email}=req.body
       
        if(password===confPass)
        {
            if(validator.isStrongPassword(password))
            {
                const encPass=await bcryptjs.hash(password,10)
                const result=await User.create({name,email,username,password:encPass})
                const token=await result.generateToken()
                res.status(201).json({success:true,userData:result,token})
            }
            else
             {
                res.status(400).json({success:false,msg:"Pease choose a strong password"})
             }
          
        }
       else
       {
        res.status(400).json({msg:"Password does not match"})
       }
    }
    catch(err)
    {
        res.status(500).json({success:false,msg:err})
    }
}

//Login user
const login=async(req,res)=>{
       try{
          const {username,password}=req.query.userData
         if(username && password)
         {
            const user=await User.findOne({username})
            if(user)
            {
              const compare=await bcryptjs.compare(password,user.password)
              if(compare)
              {
                  const token=await user.generateToken()
                  res.status(200).json({success:true,userData:user,token})
              }
            else
            {
              res.status(401).json({success:false,msg:"Password does not match",data:{password,username}})
            }
            }
           else
           {
              res.status(404).json({success:false,msg:"User not found"})
           }
         }
         else
         {
            res.status(400).json({success:false,msg:"Please provide both username and password"})
         }
          
       }
       catch(err)
       {
        res.status(500).json({success:false,msg:err})
       }
}

//logout
const logout=async(req,res)=>{
    try
    {
       const {id}=req.params
       const {authorization}=req.headers
       const token=authorization.split(" ")[1]
       const user=await User.findOne({_id:id})
        await user.deleteToken(token)
        res.clearCookie("token");
        res.status(200).json({success:true,msg:"Token deleted successfully"})
    }
    catch(err)
    {
        console.log("error in logotu")
        res.status(500).json({success:false,err})
    }
}


export {register,login,logout}
