import AppError from "../../errorHelper/AppError";
import { IauthProvider, Iuser } from "./User.interface";
import { User } from "./User.model";
import httpStatus  from 'http-status-codes';
import bcryptjs from "bcryptjs"


const createUser= async (payload:Partial<Iuser>)=>
{
    const {email,password,...rest}=payload
    const isUserExist= await User.findOne({email})
    if(isUserExist)
        {
            throw new AppError(httpStatus.BAD_REQUEST,"USER  ALREADY EXIST")
        }  

        const hashedPassword=await bcryptjs.hash(password as string,10)
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
    getAllUsers
}