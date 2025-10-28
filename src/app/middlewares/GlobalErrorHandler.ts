import { NextFunction, Request, Response } from "express"
import { envVars } from "../Config/env"
import AppError from "../errorHelper/AppError"




export const globalError=(err:any,req:Request,res:Response,next:NextFunction)=>
{
    let statusCode=500
    let message =`Something went wrong`


    // duplicate error handle
    if(err.code===11000)
    {
       
        statusCode=400
        const matchedArrey = err.message.match(/"([^"]*)"/)
        console.log("Duplicate Error", err.message)
        message=`${matchedArrey[1]} already Exist`
    }
    // cast/object ID error
    else if(err.name==="CastError")
    {
        statusCode=400,
        message="Invalid mongoose objectID"
    }

    // validation error
    else if(err.name ==="ValidationError"){

        
        statusCode=400;
        const errorSources=[]
        const errors= Object.values(err.errors)
        errors.forEach((errorObject : any)=> errorSources.push(errorObject.path))

        message= " Validation Error Occured"
       
       
    }

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