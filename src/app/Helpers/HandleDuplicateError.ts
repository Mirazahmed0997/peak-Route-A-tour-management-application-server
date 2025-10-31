import { TGenericErrorRes } from "../interfaces/error.types"



export const handleDuplicateError=(err:any): TGenericErrorRes=>
{
    const matchedArrey = err.message.match(/"([^"]*)"/)
    return{
        statusCode:400,
        message:`${matchedArrey[1]} already Exist`
    }
}