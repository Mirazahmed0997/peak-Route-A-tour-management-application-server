
import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import AppError from "../errorHelper/AppError"
import { envVars } from "../Config/env"


export const verifyAuth=(...authRoles:string[])=> async (req:Request,res:Response,next:NextFunction)=>{

   try {
     const accesToken= req.headers.authorization
     console.log(accesToken)

     if(!accesToken)
     {
        throw new AppError(403,"No token recieved")
     }
    const verifyToken =jwt.verify(accesToken,envVars.jwt_access_secret) as JwtPayload

    // if(!verifyToken)
    // {
    //     throw new AppError(403,`Unauthorised access ${verifyToken}`)
    // }


    if(!authRoles.includes(verifyToken.role))
    {
         throw new AppError(403,"Permission Denied")
    }

    req.user= verifyToken

    console.log(verifyToken)

    next()
   } catch (error) {
        next(error)
   }

}