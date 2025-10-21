import { NextFunction, Request, Response } from "express"
import { envVars } from "../Config/env"
import AppError from "../errorHelper/AppError"




export const globalError=(err:any,req:Request,res:Response,next:NextFunction)=>
{
    let statusCode=500
    let message =`Something went wrong`

    if(err instanceof AppError)
    {
        statusCode=err.statusCode,
        message= err.message
    }
    else if(err instanceof Error) {
        statusCode= 500,
        message=err.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: envVars.NODE_ENV ==="Development" ? err.stack:null
    })
}