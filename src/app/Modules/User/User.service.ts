import { Iuser } from "./User.interface";
import { User } from "./User.model";


const createUser= async (payload:Partial<Iuser>)=>
{
    const {name,email}=payload
      const user=User.create(
            {
                name,
                email
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