import AppError from "../../errorHelper/AppError"
import { Iuser } from "../User/User.interface"
import  httpStatus  from 'http-status-codes';
import { User } from "../User/User.model";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { generateToken } from "../../Utils/jwt";
import { envVars } from "../../Config/env";



const credentialsLogin=async(payload:Partial<Iuser>)=>{
    const {email,password}=payload


    const isUserExist= await User.findOne({email})
        if(!isUserExist)
            {
                throw new AppError(httpStatus.BAD_REQUEST,"USER  DOES NOT EXIST")
            } 


            // console.log(isUserExist.password)
            // console.log(password)

        const isPassordMatched=await bcryptjs.compare(password as string,isUserExist.password as string)
        console.log(isPassordMatched)

        if(!isPassordMatched)
        {
            throw new AppError(httpStatus.BAD_REQUEST,"Password Incorrect")
        }

        const jwtPayload={
        userId:isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
       }

    //    console.log(jwtPayload)

       const accesToken=generateToken(jwtPayload,envVars.jwt_access_secret,envVars.jwt_access_expire)
    //    const accesToken=jwt.sign(jwtPayload,"secret",{
    //     expiresIn:"1d"
    //    })

        return{
            accesToken
        }

        
}

export  const  authServices={
    credentialsLogin
}