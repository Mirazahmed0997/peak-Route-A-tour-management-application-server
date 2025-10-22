import { NextFunction, Request, Response } from "express"


type asynchHandler=(req:Request,res:Response,next:NextFunction)=> Promise<void>

export const catchAsynch =(fn:asynchHandler)=>(req:Request,res:Response,next:NextFunction)=>{
    Promise.resolve(fn(req,res,next)).catch((err:any)=>
    {
        console.log(err)
        next(err)
    })
}
