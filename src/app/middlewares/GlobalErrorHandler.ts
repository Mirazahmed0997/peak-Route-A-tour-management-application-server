import { NextFunction, Request, Response } from "express"
import { envVars } from "../Config/env"
import AppError from "../errorHelper/AppError"
import mongoose from "mongoose"
import { handleDuplicateError } from "../Helpers/HandleDuplicateError"
import { handleCastError } from "../Helpers/HandleCastError"
import { handleZodError } from "../Helpers/HandleZodError"
import { handleValidationError } from "../Helpers/HandleValidationError"
import { TErrorSources } from "../interfaces/error.types"
import { deletImageFromCloudinary } from "../Config/cloudunary.config"



export const globalError=async(err:any,req:Request,res:Response,next:NextFunction)=>
{
    if(envVars.NODE_ENV==="Development"){
        console.log(err)
    }


    if(req.file){
        await deletImageFromCloudinary(req.file.path)
    }

    if(req.files && Array.isArray(req.files) && req.files.length)
    {
        const imageUrls= (req.files as Express.Multer.File[])?.map(file=> file.path)
        await Promise.all(imageUrls.map(url=>deletImageFromCloudinary(url)))
    }

    
    let statusCode=500
    let message =`Something went wrong`
    let errorSources : TErrorSources[]=[
        //     {
        //     "path":"isDeleted",
        //     "message":""
        // }
                                 ]


    // duplicate error handle
    if(err.code===11000)
    {
       const dupicateError= handleDuplicateError(err) 
        statusCode=dupicateError.statusCode
        message=dupicateError.message
    }
    // cast/object ID error
    else if(err.name==="CastError")
    {
        const simplefiedError= handleCastError(err)
       statusCode=simplefiedError.statusCode
        message=simplefiedError.message
    }


    // Zod Error
    else if(err.name==="ZodError"){
        const simplefiedError= handleZodError(err)
        statusCode=simplefiedError.statusCode;
        message:simplefiedError.message
        errorSources= simplefiedError.errorSources
    }



    // validation error
    else if(err.name ==="ValidationError"){

        const simplefiedError= handleValidationError(err)
        statusCode=simplefiedError.statusCode;
        errorSources=simplefiedError.errorSources as TErrorSources[]
        message= simplefiedError.message     
       
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
        err: envVars.NODE_ENV ==="Development"?err : null,
        stack: envVars.NODE_ENV ==="Development" ? err.stack:null
    })
}