import { NextFunction, Request, Response } from "express"
import { envVars } from "../Config/env"
import AppError from "../errorHelper/AppError"




export const globalError=(err:any,req:Request,res:Response,next:NextFunction)=>
{
    let statusCode=500
    let message =`Something went wrong`
    const errorSources : any=[
        //     {
        //     "path":"isDeleted",
        //     "message":""
        // }
                                 ]


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
     
        const errors= Object.values(err.errors)
        errors.forEach((errorObject : any)=> errorSources.push({
            path:errorObject.path,
            message:errorObject.message
        }))
        console.log(errorSources)
        message= err.message


        // need to start from here
       
       
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
        errorSources,
        err,
        stack: envVars.NODE_ENV ==="Development" ? err.stack:null
    })
}