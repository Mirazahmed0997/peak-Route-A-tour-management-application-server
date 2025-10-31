import mongoose from "mongoose"
import { TErrorSources, TGenericErrorRes } from "../interfaces/error.types"



export const handleValidationError=(err: mongoose.Error.ValidationError): TGenericErrorRes=>
{
    const errorSources: TErrorSources[]=[]

        const errors= Object.values(err.errors)
        errors.forEach((errorObject : any)=> errorSources.push({
            path:errorObject.path,
            message:errorObject.message
        }))
        console.log(errorSources)

        return{
            statusCode : 400,
            message:  "Validation Error",
            errorSources
        }
}