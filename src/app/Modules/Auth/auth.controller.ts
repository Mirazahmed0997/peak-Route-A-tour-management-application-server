import { NextFunction, Request, Response } from "express";
import { catchAsynch } from "../../Utils/CatchAsync"
import { sendResponse } from "../../Utils/sendResponse"
import  httpStatus  from 'http-status-codes';
import { User } from "../User/User.model";
import { authServices } from "./auth.service";


const credentialsLogin=catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
{

    const logInInfo= await authServices.credentialsLogin(req.body)
      

        // res.status(httpStatus.CREATED).json({
        //     message: "User successfully created"
        // })
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message:"User Login successfully",
            data:logInInfo,
        })
})

export  const  authControllers={
    credentialsLogin
}