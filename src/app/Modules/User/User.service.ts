import AppError from "../../errorHelper/AppError";
import { IauthProvider, Iuser } from "./User.interface";
import { User } from "./User.model";
import httpStatus  from 'http-status-codes';


const createUser= async (payload:Partial<Iuser>)=>
{
    const {email,...rest}=payload
    const isUserExist= await User.findOne({email})
    if(isUserExist)
        {
            throw new AppError(httpStatus.BAD_REQUEST,"USER  ALREADY EXIST")
        }  

        const authProvider :IauthProvider={provider:"credentials",providerId:email!} 

           const user=User.create(
            {
                
                email,
                auths:[authProvider],
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