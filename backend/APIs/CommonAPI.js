/* eslint-disable no-unused-vars */
import exp from 'express';
import {verifyToken} from "../middlewares/verifyToken.js"
import { authenticate } from '../services/authServices.js';
import { UserTypeModel } from '../models/UserModel.js';
export const commonRoute = exp.Router();

//login
commonRoute.post("/login",async(req,res)=>{
    let userCred =req.body;
    let {token,user}=await authenticate(userCred)
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false,
    })
    res.status(201).json({message:"login success",payload:user})
})

//logout
commonRoute.get("/logout",async(req,res)=>{
    //clear the cookie named 'token
    res.clearCookie('token',{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    });
    res.status(200).json({message:'logged out successfull'})
})


//change password
commonRoute.put("/change-password",async(req,res)=>{
    //get current passowrd and new password
    
    //check the current password is correct
    //repalce current password with new password
    //send res

})

//Page  refresh
commonRoute.get("/check-auth",
verifyToken("USER","AUTHOR","ADMIN"),
async (req,res)=>{
    // Fetch full user from DB so the response shape matches login (has _id, not userId)
    const user = await UserTypeModel.findById(req.user.userId).select('-password');
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    res.status(200).json({
        message:"authenticated",
        payload:user
    })
})