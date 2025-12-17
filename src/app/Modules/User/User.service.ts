import AppError from "../../errorHelper/AppError";
import { IauthProvider, isActive, Iuser, Role } from "./User.interface";
import { User } from "./User.model";
import httpStatus  from 'http-status-codes';
import bcryptjs from "bcryptjs"
import { envVars } from "../../Config/env";
import { JwtPayload } from "jsonwebtoken";
import { QueryBuilder } from "../../Utils/QueryBuilder";
import { searchFields } from "./User.constant";


const createUser= async (payload:Partial<Iuser>)=>
{
    const {email,password,...rest}=payload
    const isUserExist= await User.findOne({email})
    if(isUserExist)
        {
            throw new AppError(httpStatus.BAD_REQUEST,"USER ALREADY EXIST")
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

    if(decotedToken.role=== Role.USER || decotedToken.role===Role.GUIDE)
    {
      if(!userId==decotedToken.userId)
      {
        throw new AppError(401,"You are not authorised")
      }
    }

    const isUserExist=await User.findById(userId)

    if(!isUserExist){
        {
            throw new AppError(httpStatus.NOT_FOUND,"User not found")
        }
    }


    if(decotedToken.role=== Role.ADMIN && isUserExist.role===Role.SUPER_ADMIN)
    {
      throw new AppError(401,"You are not authorised")
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

    // if(payload.role===Role.SUPER_ADMIN && decotedToken.role === Role.ADMIN)
    // {
    //      throw new AppError(httpStatus.FORBIDDEN,"Unauthorized access")
    // }

    if(payload.isActive || payload.isDeleted|| payload.isVerified)
    {
          if(decotedToken.role==Role.USER || decotedToken.role== Role.GUIDE)
        {
            throw new AppError(httpStatus.FORBIDDEN,"Unauthorized access")
        }
    }

 

    const newUpdatedUser= await User.findByIdAndUpdate(userId,payload, {new:true, runValidators:true})

    return newUpdatedUser
}


const getAllUsers=async (query: Record<string, string>)=>
{
    const queryBuilder = new QueryBuilder(User.find(), query)
     const users = await queryBuilder
       .search(searchFields)
       .filter()
       .fields()
       .paginate()
       .sort()
      
   
     const [data, meta] = await Promise.all([
       users.build(),
       queryBuilder.getMeta()
     ])

     return {
    data,
    meta
  }
}


const getUsersProfile=async (userId:string)=>
{
     const user = await User.findById(userId).select("-password")
     return {
       data: user,
     }
}


const getSingleUser=async (userId:string)=>
{
     const user = await User.findById(userId).select("-password")
     return {
       data: user,
     }
}




const deleteUser = async (userId: string, decodedToken: JwtPayload) => {
    const isUserExist = await User.findById(userId);
  
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
  
    if (isUserExist.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, "User already deleted");
    }
  
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "Unauthorized access");
    }
  
    if (decodedToken.role === Role.ADMIN && isUserExist.role === Role.SUPER_ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "Admins cannot delete Super Admins");
    }
  
    // SOFT DELETE 
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true, isActive: isActive.BLOCKED },
      { new: true, runValidators: true }
    );
  
    return deletedUser;
  };
  



export const userServices={
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getSingleUser,
    getUsersProfile
}