import { error } from "console"
import dotenv from "dotenv"

dotenv.config()

interface EnvConfig{
      PORT: string,
      DB_URL:string ,
      NODE_ENV: string,
      BCRYPT_SALT_ROUND:string,
      jwt_access_expire:string,
      jwt_access_secret:string,
      SUPER_ADMIN_EMAIL:string,
      SUPER_ADMIN_PASSWORD:string,
      JWT_EXPIRE_SECRET:string,
      JWT_REFRESH_SECRET:string
}

const loadEnvVariables=():EnvConfig=>
{
    const requiredEnvVariables: string[]=["PORT","DB_URL","NODE_ENV","BCRYPT_SALT_ROUND","jwt_access_expire","jwt_access_secret","SUPER_ADMIN_EMAIL","SUPER_ADMIN_PASSWORD","JWT_EXPIRE_SECRET","JWT_REFRESH_SECRET"]

    requiredEnvVariables.forEach(key=>
    {
        if(!process.env[key])
        {
            throw new Error(`missing require environment variable ${key}`)
        }
    }
    )

    return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV as string,
    BCRYPT_SALT_ROUND:process.env.BCRYPT_SALT_ROUND as string,
    jwt_access_expire: process.env.jwt_access_expire as string,
    jwt_access_secret:process.env.jwt_access_secret as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    JWT_EXPIRE_SECRET: process.env.JWT_EXPIRE_SECRET as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string
}
}

export const envVars = loadEnvVariables()
//     PORT: process.env.PORT,
//     DB_URL: process.env.DB_URL,
//     NODE_ENV: process.env.NODE_ENV
// }