import { NextFunction, Request, Response } from "express";
import { User } from "./User.model";
import httpStatus from "http-status-codes"
import { promise, success } from 'zod';
import { catchAsynch } from "../../Utils/CatchAsync";
import { userServices } from "./User.service";
import { sendResponse } from "../../Utils/sendResponse";
import { verifyToken } from "../../Utils/jwt";
import { envVars } from "../../Config/env";
import { JwtPayload } from "jsonwebtoken";




 const createUser= catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
{
    const user = await userServices.createUser(req.body)
      

        // res.status(httpStatus.CREATED).json({
        //     message: "User successfully created"
        // })
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.CREATED,
            message:"User Create successfully",
            data:user,
        })
})

 const updateUser= catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
{
    const userId= req.params.id
    // const token= req.headers.authorization
    // const verifiedToken = verifyToken(token as string,envVars.jwt_access_secret) as JwtPayload
    const verifiedToken=req.user
    const payload= req.body
    const user = await userServices.updateUser(userId as string,payload,verifiedToken as JwtPayload)
      

        // res.status(httpStatus.CREATED).json({
        //     message: "User successfully created"
        // })
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.CREATED,
            message:"User updated successfully",
            data:user,
        })
})

const getAllUsers=catchAsynch(async (req:Request,res:Response,next:NextFunction)=>{
         const result= await userServices.getAllUsers()
        //  res.status(httpStatus.OK).json({
        //     success:true,
        //     message: "Get All Users",
        //     data: users
        //  })
           sendResponse(res,{
            success:true,
            statusCode:httpStatus.CREATED,
            message:"Successfully Get all users",
            data:result.data,
            meta:result.meta
        })
})



export const deleteUser = catchAsynch(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params; // ✅ get user ID from URL
      const verifyToken = req.user; // ✅ assuming JWT middleware sets req.user
  
      // ✅ call service with parameters
      const result = await userServices.deleteUser(id as string, verifyToken as JwtPayload);
  
      // ✅ send success response
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK, // use 200 for successful delete
        message: "User deleted successfully",
        data: result,
      });
    }
  );





function next(_error: unknown) {
    throw new Error("Function not implemented.");
}

export const userControllers={
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
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