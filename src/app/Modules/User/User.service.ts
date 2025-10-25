import AppError from "../../errorHelper/AppError";
import { IauthProvider, isActive, Iuser, Role } from "./User.interface";
import { User } from "./User.model";
import httpStatus  from 'http-status-codes';
import bcryptjs from "bcryptjs"
import { envVars } from "../../Config/env";
import { JwtPayload } from "jsonwebtoken";


const createUser= async (payload:Partial<Iuser>)=>
{
    const {email,password,...rest}=payload
    const isUserExist= await User.findOne({email})
    if(isUserExist)
        {
            throw new AppError(httpStatus.BAD_REQUEST,"USER  ALREADY EXIST")
        }  

        const hashedPassword=await bcryptjs.hash(password as string,Number(envVars.BCRYPT_SALT_ROUND))
        console.log(hashedPassword)

        const isPasswordMatch= await bcryptjs.compare(password!,hashedPassword)

        console.log(isPasswordMatch)

        const authProvider :IauthProvider={provider:"credentials",providerId:email!} 

           const user=User.create(
            {
                
                email,
                auths:[authProvider],
                password:hashedPassword,
                ...rest
            }

        )

        return user;

}

const updateUser=async(userId:string,payload:Partial<Iuser>,decotedToken:JwtPayload)=>
{

    const isUserExist=await User.findById(userId)

    if(!isUserExist){
        {
            throw new AppError(httpStatus.NOT_FOUND,"User not found")
        }
    }

    if(isUserExist.isDeleted || isUserExist.isActive===isActive.BLOCKED){
        throw new AppError(httpStatus.NOT_FOUND,"User unable to be updated")
    }


    if(payload.role)
    {
        if(decotedToken.role==Role.USER || decotedToken.role== Role.GUIDE)
        {
            throw new AppError(httpStatus.FORBIDDEN,"Unauthorized access")
        }
    }

    if(payload.role===Role.SUPER_ADMIN && decotedToken.role === Role.ADMIN)
    {
         throw new AppError(httpStatus.FORBIDDEN,"Unauthorized access")
    }

    if(payload.isActive || payload.isDeleted|| payload.isVerified)
    {
          if(decotedToken.role==Role.USER || decotedToken.role== Role.GUIDE)
        {
            throw new AppError(httpStatus.FORBIDDEN,"Unauthorized access")
        }
    }

    if(payload.password)
    {
        payload.password=await bcryptjs.hash(payload.password,envVars.BCRYPT_SALT_ROUND) 
    }

    const newUpdatedUser= await User.findByIdAndUpdate(userId,payload, {new:true, runValidators:true})

    return newUpdatedUser
}


const getAllUsers=async ()=>
{
    const users= await User.find({})
    const totalUser=await User.countDocuments()
    return {
        data:users,
        meta:{
            total:totalUser
        }
    }
}



export const userServices={
    createUser,
    getAllUsers,
    updateUser
}