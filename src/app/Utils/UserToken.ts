import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../Config/env";
import AppError from "../errorHelper/AppError";
import { isActive, Iuser } from "../Modules/User/User.interface";
import { User } from "../Modules/User/User.model";
import { generateToken, verifyToken } from "./jwt";
import  httpStatus  from 'http-status-codes';


export const createUserTokrens=(user:Partial<Iuser>)=>
{
    
            const jwtPayload={
            userId:user._id,
            email: user.email,
            role: user.role
           }
    
    
        const accesToken=generateToken(jwtPayload,envVars.jwt_access_secret,envVars.jwt_access_expire)
        const refreshToken= generateToken(jwtPayload,envVars.JWT_REFRESH_SECRET,envVars.JWT_EXPIRE_SECRET)

        return{
            accesToken,
            refreshToken
        }
}

export const createNewAccessTokenWithrefreshToken= async  (refreshToken:string)=>
{
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

        return {
            accesToken
        }
}