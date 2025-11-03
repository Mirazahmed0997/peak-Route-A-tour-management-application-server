import { model, Schema } from "mongoose";
import { Idivision } from "./Division.interface";


const divisionSchema = new Schema<Idivision>({

    name: {type:String, required: true, unique:true},
    slug: {type: String, required:true, unique:true},
    thumnail: {type: String},
    description: {type: String}

},
{
    timestamps:true,
})

export const Division = model<Idivision>("Division", divisionSchema)