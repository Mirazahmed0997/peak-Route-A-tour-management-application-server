import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./User.controller";
import { createUserZodSchema } from "./User.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import jwt, { JwtPayload } from "jsonwebtoken"
import AppError from "../../errorHelper/AppError";
import { Role } from "./User.interface";





    

const router =Router()

router.post('/register',validateRequest(createUserZodSchema),userControllers.createUser)

router.get('/AllUsers',
    async (req:Request,res:Response,next:NextFunction)=>{

   try {
     const accesToken= req.headers.authorization
     console.log(accesToken)

     if(!accesToken)
     {
        throw new AppError(403,"No token recieved")
     }
    const verifyToken=jwt.verify(accesToken,"secret")

    if(!verifyToken)
    {
        throw new AppError(403,`Unauthorised access ${verifyToken}`)
    }

    console.log(verifyToken)

    if((verifyToken as JwtPayload).role !== Role.ADMIN || Role.SUPER_ADMIN)
    {
         throw new AppError(403,"Permission Denied")
    }

    console.log(verifyToken)

    next()
   } catch (error) {
        next(error)
   }

}, 
userControllers.getAllUsers)

export const userRoutes= router