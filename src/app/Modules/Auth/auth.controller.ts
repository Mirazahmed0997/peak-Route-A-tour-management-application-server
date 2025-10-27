import { NextFunction, Request, Response } from "express";
import { catchAsynch } from "../../Utils/CatchAsync"
import { sendResponse } from "../../Utils/sendResponse"
import  httpStatus  from 'http-status-codes';
import { User } from "../User/User.model";
import AppError from "../../errorHelper/AppError";
import { authServices } from "./auth.service";
import { setAuthCookies } from "../../Utils/setCookie";


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

    const tokenInfo= await authServices.getNewAccessToken(refreshToken)
    
    
    res.cookie("accessToken",tokenInfo.accessToken,{
        httpOnly:true,
        secure:false
    })
      

        // res.status(httpStatus.CREATED).json({
        //     message: "User successfully created"
        // })
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message:"User Login successfully",
            data:tokenInfo,
        })
})

export  const  authControllers={
    credentialsLogin,
    getNewAccessToken
}