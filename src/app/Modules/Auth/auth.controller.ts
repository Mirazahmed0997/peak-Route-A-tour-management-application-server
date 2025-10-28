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
import passport from "passport";


const credentialsLogin=catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
{

    // const logInInfo= await authServices.credentialsLogin(req.body)
    passport.authenticate("local",async(err: any,user:any,info:any)=>
    {
        if(err)
        {
            return next(new AppError(401,err))
        }

        if(!user)
        {
            return next(new AppError(401,info.message))
        }

        const userTokens=  createUserTokrens(user)

        // delete user.toObject().password
        const {password:pass,...rest}=user.toObject()


         setAuthCookies(res,userTokens)
          
       sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message:"User Login successfully",
            data:{
                accessToken: userTokens.accesToken,
                refreshToken:userTokens.refreshToken,
                user:rest
            },
        })

    })(req,res,next)

   
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

        let redirectTo= req.query.state? req.query.state as string : " " 

        if(redirectTo.startsWith('/'))
        {
            redirectTo= redirectTo.slice(1)
        }

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


        res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
})




export  const  authControllers={
    credentialsLogin,
    getNewAccessToken,
    logOut,
    resetPassword,
    googleCallBackControllers
}