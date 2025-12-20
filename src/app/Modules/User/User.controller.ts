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
import { Iuser } from "./User.interface";




 const createUser= catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
{

      // req.body = JSON.parse(req.body.data)
      // const payload: Iuser = {
      //   ...req.body,
      //   picture: req.file?.path
      // }
    const payload= req.body
    const user = await userServices.createUser(payload)
      

        sendResponse(res,{
            success:true,
            statusCode:httpStatus.CREATED,
            message:"User Create successfully",
            data:user,
        })
})

 const updateUser= catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
{
    req.body = JSON.parse(req.body.data)
    const userId= req.params.id
    
    // const token= req.headers.authorization
    // const verifiedToken = verifyToken(token as string,envVars.jwt_access_secret) as JwtPayload



    const verifiedToken=req.user
    const payload: Iuser = {
        ...req.body,
        picture: req.file?.path
      }
    const user = await userServices.updateUser(userId as string,payload,verifiedToken as JwtPayload)
      

        sendResponse(res,{
            success:true,
            statusCode:httpStatus.CREATED,
            message:"User updated successfully",
            data:user,
        })
})

const getAllUsers=catchAsynch(async (req:Request,res:Response,next:NextFunction)=>{
  const query = req.query
         const result= await userServices.getAllUsers(query as Record<string, string>)
      
           sendResponse(res,{
            success:true,
            statusCode:httpStatus.CREATED,
            message:"Successfully Get all users",
            data:result.data,
            meta:result.meta
        })
})





const getUsersProfile=catchAsynch(async (req:Request,res:Response,next:NextFunction)=>{

         const decodedToken=req.user as JwtPayload

         const result= await userServices.getUsersProfile(decodedToken.userId)
           sendResponse(res,{
            success:true,
            statusCode:httpStatus.CREATED,
            message:"Successfully Get users profile",
            data:result,
        })
})
const getSingleUser=catchAsynch(async (req:Request,res:Response,next:NextFunction)=>{

         const id=req.params.id

         const result= await userServices.getUsersProfile(id as string)
           sendResponse(res,{
            success:true,
            statusCode:httpStatus.CREATED,
            message:"Successfully Get single profile",
            data:result,
        })
})



export const deleteUser = catchAsynch(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params; 
      const verifyToken = req.user; 
  
      // call service with parameters
      const result = await userServices.deleteUser(id as string, verifyToken as JwtPayload);
  
      // send success response
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
    deleteUser,
    getSingleUser,
    getUsersProfile
}


