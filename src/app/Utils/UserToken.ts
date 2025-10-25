import { envVars } from "../Config/env";
import { Iuser } from "../Modules/User/User.interface";
import { generateToken } from "./jwt";


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