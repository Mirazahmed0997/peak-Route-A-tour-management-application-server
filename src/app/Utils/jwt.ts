import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import { string } from "zod"

export const generateToken=(payload : JwtPayload,secret:string,expiresIn:string)=>
{
    const  token= jwt.sign(payload,secret,{
        expiresIn
    } as SignOptions)

    return token
}


export const verifyToken=(token:string,secret:string) =>
{
    const verifyToken=jwt.verify(token,secret)
}