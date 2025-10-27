import AppError from "../../errorHelper/AppError"
import { isActive, Iuser } from "../User/User.interface"
import  httpStatus  from 'http-status-codes';
import { User } from "../User/User.model";
import bcryptjs from "bcryptjs"
import jwt, { JwtPayload } from "jsonwebtoken"
import { generateToken, verifyToken } from "../../Utils/jwt";
import { envVars } from "../../Config/env";
import { createNewAccessTokenWithrefreshToken, createUserTokrens } from "../../Utils/UserToken";
import { email, string } from 'zod';



const credentialsLogin=async(payload:Partial<Iuser>)=>{
    const {email,password}=payload


    const isUserExist= await User.findOne({email})
        if(!isUserExist)
            {
                throw new AppError(httpStatus.BAD_REQUEST,"USER  DOES NOT EXIST")
            } 

        const isPassordMatched=await bcryptjs.compare(password as string,isUserExist.password as string)
        console.log(isPassordMatched)

        if(!isPassordMatched)
        {
            throw new AppError(httpStatus.BAD_REQUEST,"Password Incorrect")
        }


    const userTokens= createUserTokrens(isUserExist)
    console.log(userTokens)

    const {password:pass,...rest}=isUserExist.toObject()

        return{
            accessToken: userTokens.accesToken,
            refreshToken: userTokens.refreshToken,
            user:rest
        }

        
}
const getNewAccessToken=async(refreshToken:string)=>{

   
    const newAccessToken=await createNewAccessTokenWithrefreshToken(refreshToken)
    console.log(newAccessToken)



        return {
            accessToken:newAccessToken
        }

        
}

export  const  authServices={
    credentialsLogin,
    getNewAccessToken
}