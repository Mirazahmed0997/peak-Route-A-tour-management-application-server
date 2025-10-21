import { NextFunction, Request, Response } from "express"
import { envVars } from "../Config/env"




export const globalError=(err:any,req:Request,res:Response,next:NextFunction)=>
{
    const statusCode=500
    const message =`Somthing went wrong ${err.message}`
    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: envVars.NODE_ENV ==="Development" ? err.stack:null
    })
}