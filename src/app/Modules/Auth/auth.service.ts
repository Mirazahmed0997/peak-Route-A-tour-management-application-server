import AppError from "../../errorHelper/AppError"
import { IauthProvider, isActive, Iuser } from "../User/User.interface"
import httpStatus from 'http-status-codes';
import { User } from "../User/User.model";
import bcryptjs from "bcryptjs"
import jwt, { JwtPayload } from "jsonwebtoken"
import { envVars } from "../../Config/env";
import { createNewAccessTokenWithrefreshToken, createUserTokrens } from "../../Utils/UserToken";
import { sendEmail } from "../../Utils/sendEmail";



// const credentialsLogin=async(payload:Partial<Iuser>)=>{
//     const {email,password}=payload


//     const isUserExist= await User.findOne({email})
//         if(!isUserExist)
//             {
//                 throw new AppError(httpStatus.BAD_REQUEST,"USER  DOES NOT EXIST")
//             } 

//         const isPassordMatched=await bcryptjs.compare(password as string,isUserExist.password as string)

//         if(!isPassordMatched)
//         {
//             throw new AppError(httpStatus.BAD_REQUEST,"Password Incorrect")
//         }

//     const userTokens= createUserTokrens(isUserExist)

//     const {password:pass,...rest}=isUserExist.toObject()

//         return{
//             accessToken: userTokens.accesToken,
//             refreshToken: userTokens.refreshToken,
//             user:rest
//         }


// }
const getNewAccessToken = async (refreshToken: string) => {


    const newAccessToken = await createNewAccessTokenWithrefreshToken(refreshToken)
    console.log(newAccessToken)



    return {
        accessToken: newAccessToken
    }


}


const resetPassword = async ( newPassword: string,id:string, decodedToken: JwtPayload) => {

    if(id !==decodedToken.userId)
    {
        throw new AppError(401,"you cannot reset your password")
    }

    const isUserExist= await User.findById(decodedToken.userId)
    if(!isUserExist)
    {
        throw new AppError(401,"User does not exist")
    }

     const hashedPassword = await bcryptjs.hash(newPassword,
        Number(envVars.BCRYPT_SALT_ROUND)
    )

    isUserExist.password=hashedPassword;
    await isUserExist.save()
}


const setPassword = async (userId: string, plainPassword: string) => {

    const user = await User.findById(userId)
    if (!user) {
        throw new AppError(404, "User not found")
    }

    if (user.password && user.auths.some(providerObject => providerObject.provider == "google")) {
        throw new AppError(httpStatus.BAD_REQUEST, "You have already set your password now ypu can change your password from profile")
    }

    const hashedPassword = await bcryptjs.hash(plainPassword,
        Number(envVars.BCRYPT_SALT_ROUND)
    )

    const credintialProvider: IauthProvider = {
        provider: "credentials",
        providerId: user.email
    }

    const auths: IauthProvider[] = [...user.auths, credintialProvider]

    user.password = hashedPassword

    user.auths = auths

    await user.save()

}


const forgotPassword = async (email: string) => {

    const isUserExist = await User.findOne({ email })

    if (isUserExist?.isActive === isActive.BLOCKED) {
        throw new AppError(httpStatus.BAD_REQUEST, "USER  is blocked")
    }
    if (isUserExist?.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "USER  is deleted")
    }

    if (!isUserExist?.isVerified) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is not verified")
    }

    if (isUserExist?.isActive === isActive.INACTIVE) {
        throw new AppError(httpStatus.BAD_REQUEST, "USER  is inactive")
    }

    const JwtPayload={
        userId: isUserExist._id,
        email:isUserExist.email,
        role:isUserExist.role
    }

    const resetToken= jwt.sign(JwtPayload,envVars.jwt_access_secret,
        {
            expiresIn:"10m"
        }
    )

    const resetUILink=`${envVars.FRONTEND_URL}/reset-password?id=${isUserExist._id}&token=${resetToken}`

    sendEmail({
        to:isUserExist.email,
        subject:"Password Reset",
        templateName:"forgetPassword",
        templateData:{
            name: isUserExist.name,
            resetUILink
        }
    })

}


const changePassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId)

    const isOldPasswordMatched = await bcryptjs.compare(oldPassword, user?.password as string)
    if (!isOldPasswordMatched) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Password not mathched")
    }

    user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))
    user?.save()
    return true;

}

export const authServices = {
    getNewAccessToken,
    resetPassword,
    changePassword,
    setPassword,
    forgotPassword
}