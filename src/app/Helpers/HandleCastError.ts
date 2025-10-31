import mongoose from "mongoose"
import { TGenericErrorRes } from "../interfaces/error.types"


export const handleCastError=(err:mongoose.Error.CastError) : TGenericErrorRes=>
{
    return {
         statusCode :400,
         message : "Invalid mongoose objectID"
    }
}