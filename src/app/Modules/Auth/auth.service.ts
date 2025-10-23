import AppError from "../../errorHelper/AppError"
import { Iuser } from "../User/User.interface"
import  httpStatus  from 'http-status-codes';
import { User } from "../User/User.model";
import bcryptjs from "bcryptjs"



const credentialsLogin=async(payload:Partial<Iuser>)=>{
    const {email,password}=payload


    const isUserExist= await User.findOne({email})
        if(!isUserExist)
            {
                throw new AppError(httpStatus.BAD_REQUEST,"USER  DOES NOT EXIST")
            } 


            console.log(isUserExist.password)
            console.log(password)

        const isPassordMatched=await bcryptjs.compare(password as string,isUserExist.password as string)
        console.log(isPassordMatched)

        if(!isPassordMatched)
        {
            throw new AppError(httpStatus.BAD_REQUEST,"Password Incorrect")
        }

       

        return{
            email: isUserExist.email
        }

        
}

export  const  authServices={
    credentialsLogin
}