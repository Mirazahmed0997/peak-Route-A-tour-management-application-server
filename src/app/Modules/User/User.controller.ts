import { Request, Response } from "express";
import { User } from "./User.model";
import httpStatus from "http-status-codes"

const createUser= async(req:Request,res:Response)=>
{
    try {

        const {name,email}=req.body
        const user=User.create(
            {
                name,
                email
            }
        )

        res.status(httpStatus.CREATED).json({
            message: "User successfully created"
        })
        
    } catch (error : any) {
        console.log(error)
        res.status(httpStatus.BAD_REQUEST).json({
            message: `"Route not found ${error.message}`
        })
    }
}

export const  userControllers={
    createUser
}