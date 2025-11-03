import { NextFunction, Request, Response } from "express"
import { envVars } from "../Config/env"


type asynchHandler=(req:Request,res:Response,next:NextFunction)=> Promise<void>

export const catchAsynch =(fn:asynchHandler)=>(req:Request,res:Response,next:NextFunction)=>{
    Promise.resolve(fn(req,res,next)).catch((err:any)=>
    {
        if(envVars.NODE_ENV==="Development"){
        console.log(err)
    }
        next(err)
    })
}
