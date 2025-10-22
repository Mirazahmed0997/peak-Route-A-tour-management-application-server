import { NextFunction, Request, Response } from "express";
import { User } from "./User.model";
import httpStatus from "http-status-codes"
import { promise, success } from 'zod';
import { catchAsynch } from "../../Utils/CatchAsync";
import { userServices } from "./User.service";




 const createUser= catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
{
    const user = await userServices.createUser(req.body)
      

        res.status(httpStatus.CREATED).json({
            message: "User successfully created"
        })
})

const getAllUsers=catchAsynch(async (req:Request,res:Response,next:NextFunction)=>{
         const users= await userServices.getAllUsers()
         res.status(httpStatus.OK).json({
            success:true,
            message: "Get All Users",
            data: users
         })
})


function next(_error: unknown) {
    throw new Error("Function not implemented.");
}

export const userControllers={
    createUser,
    getAllUsers
}



// const createUserFunction=async (req:Request,res:Response)=>
// {
//      const user = await userServices.createUser(req.body)
      

//         res.status(httpStatus.CREATED).json({
//             message: "User successfully created"
//         })
// }



// const createUser= async(req:Request,res:Response,next:NextFunction)=>
// {
//     try {
        

        
//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
// }