import AppError from "../../errorHelper/AppError"
import { isActive, Iuser } from "../User/User.interface"
import  httpStatus  from 'http-status-codes';
import { User } from "../User/User.model";
import bcryptjs from "bcryptjs"
import jwt, { JwtPayload } from "jsonwebtoken"
import { generateToken, verifyToken } from "../../Utils/jwt";
import { envVars } from "../../Config/env";
import { createUserTokrens } from "../../Utils/UserToken";
import { email } from 'zod';



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


    const userTokens= createUserTokrens(isUserExist)

    const {password:pass,...rest}=isUserExist.toObject()

        return{
            accesToken: userTokens.accesToken,
            refreshToken: userTokens.refreshToken,
            user:rest
        }

        
}
const getNewAccessToken=async(refreshToken:string)=>{

    const verifyRefreshToken=verifyToken(refreshToken,envVars.JWT_REFRESH_SECRET) as JwtPayload
    const isUserExist= await User.findOne({email: verifyRefreshToken.email})
        if(!isUserExist)
            {
                throw new AppError(httpStatus.BAD_REQUEST,"USER  DOES NOT EXIST")
            } 

        if(isUserExist.isActive=== isActive.BLOCKED)
        {
             throw new AppError(httpStatus.BAD_REQUEST,"USER  is blocked")
        }
        if(isUserExist.isDeleted)
        {
             throw new AppError(httpStatus.BAD_REQUEST,"USER  is deleted")
        }

          if(isUserExist.isActive=== isActive.INACTIVE)
        {
             throw new AppError(httpStatus.BAD_REQUEST,"USER  is inactive")
        }

           const jwtPayload={
            userId:isUserExist._id,
            email: isUserExist.email,
            role: isUserExist.role
           }
    
    
        const accesToken=generateToken(jwtPayload,envVars.jwt_access_secret,envVars.jwt_access_expire)




        return{
         
            accesToken,
            
              }

        
}

export  const  authServices={
    credentialsLogin,
    getNewAccessToken
}