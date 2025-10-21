import { Request, Response } from "express";
import { User } from "./User.model";
import httpStatus from "http-status-codes"
import { userServices } from "./User.service";

const createUser= async(req:Request,res:Response)=>
{
    try {

        const user = await userServices.createUser(req.body)
      

        res.status(httpStatus.CREATED).json({
            message: "User successfully created"
        })
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const  userControllers={
    createUser
}

function next(error: unknown) {
    throw new Error("Function not implemented.");
}
