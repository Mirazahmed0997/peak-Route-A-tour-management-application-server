
import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import AppError from "../errorHelper/AppError"
import { envVars } from "../Config/env"
import { User } from "../Modules/User/User.model"
import { isActive } from "../Modules/User/User.interface"
import  httpStatus  from 'http-status-codes';


export const verifyAuth=(...authRoles:string[])=> async (req:Request,res:Response,next:NextFunction)=>{

   try {
     const accesToken= req.headers.authorization || req.cookies.accessToken

     if(!accesToken)
     {
        throw new AppError(403,"No token recieved")
     }
    const verifyToken =jwt.verify(accesToken,envVars.jwt_access_secret) as JwtPayload
  
     const isUserExist= await User.findOne({email: verifyToken.email})

     console.log("from check auth",isUserExist)
     
    if(isUserExist?.isActive=== isActive.BLOCKED)
        {
             throw new AppError(httpStatus.BAD_REQUEST,"USER  is blocked")
        }
    if(isUserExist?.isDeleted)
        {
             throw new AppError(httpStatus.BAD_REQUEST,"USER  is deleted")
        }

    if(!isUserExist?.isVerified)
          {
               throw new AppError(httpStatus.BAD_REQUEST,"User is not verified")
          }   

     if(isUserExist?.isActive=== isActive.INACTIVE)
        {
             throw new AppError(httpStatus.BAD_REQUEST,"USER  is inactive")
        }


    if(!authRoles.includes(verifyToken.role))
    {
         throw new AppError(403,"Permission Denied")
    }

    req.user= verifyToken

    console.log(verifyToken)

    next()
   } 
   
   catch (error) {
        next(error)
   }

}