import { email } from "zod";
import { IauthProvider, Role } from "../Modules/User/User.interface";
import { User } from "../Modules/User/User.model"
import { envVars } from './../Config/env';
import bcryptjs from "bcryptjs"



export const seedSuperAdmin= async()=>
{
    try {

        const isSuperAdminExist=await User.findOne({email: envVars.SUPER_ADMIN_EMAIL})

        if(isSuperAdminExist){
            console.log("Already have a Super Admin")
            return
        }


        const hashedPassword=await bcryptjs.hash(envVars.SUPER_ADMIN_PASSWORD as string,Number(envVars.BCRYPT_SALT_ROUND))
        const authProvider : IauthProvider={
            provider: "credentials",
            providerId:envVars.SUPER_ADMIN_EMAIL
        }


        const payload= {
            name: "Super Admin",
            role: Role.SUPER_ADMIN,
            email:envVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            isVerified:true,
            auths:[authProvider]
        }

        const superAdmin= User.create(payload)
        console.log("Super Admin created successfully")

        
    } catch (error) {
        console.log(error)
    }
}