import { NextFunction, Request, Response } from "express";
import { catchAsynch } from "../../Utils/CatchAsync"
import { sendResponse } from "../../Utils/sendResponse"
import  httpStatus  from 'http-status-codes';
import { User } from "../User/User.model";
import AppError from "../../errorHelper/AppError";
import { authServices } from "./auth.service";
import { setAuthCookies } from "../../Utils/setCookie";
import { JwtPayload } from "jsonwebtoken";
import { createUserTokrens } from './../../Utils/UserToken';
import { envVars } from "../../Config/env";


const credentialsLogin=catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
{

    const logInInfo= await authServices.credentialsLogin(req.body)

    setAuthCookies(res,logInInfo)
          
       sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message:"User Login successfully",
            data:logInInfo,
        })
})


const getNewAccessToken=catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
{
    const refreshToken=req.cookies.refreshToken

    if(!refreshToken)
    {
        throw new AppError(httpStatus.BAD_REQUEST,"No refresh Token")
    }

    const tokenInfo= await authServices.getNewAccessToken(refreshToken as string)  

    // to set new acces token in cookies

    // setAuthCookies(res,tokenInfo) 
    
    
    res.cookie("accessToken",tokenInfo.accessToken,{
        httpOnly:true,
        secure:false
    })
      

       
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message:"Successfully get new access token",
            data:tokenInfo,
        })
})


const logOut=catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
{

    res.clearCookie("accessToken",{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    })

    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    })
      

       
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message:"User Logged out successfully",
            data:null,
        })
})


const resetPassword=catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
{

 
   
    const newPassword= req.body.newPassword
    const oldPassword= req.body.oldPassword
    const decodedToken= req.user


    // await authServices.resetPassword(oldPassword,newPassword,decodedToken)
    await authServices.resetPassword(oldPassword,newPassword,decodedToken as JwtPayload)
      

       
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message:"Password changed successfully",
            data:null,
        })
})


const googleCallBackControllers=catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
{

 
        const user=  req.user

        console.log("from google callback",user)

        if(!user){
            throw new AppError(httpStatus.NOT_FOUND,"User not found")
        }
        const tokenInfo = createUserTokrens(user)
        setAuthCookies(res,tokenInfo)
       
        // sendResponse(res,{
        //     success:true,
        //     statusCode:httpStatus.OK,
        //     message:"Password changed successfully",
        //     data:null,
        // })


        res.redirect(envVars.FRONTEND_URL)
})




export  const  authControllers={
    credentialsLogin,
    getNewAccessToken,
    logOut,
    resetPassword,
    googleCallBackControllers
}