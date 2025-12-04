import { model, Schema } from "mongoose";
import { IDepartment } from "./Department.interface";


const departmentSchema = new Schema<IDepartment>({
    title: {type: String,required: true, unique:true}
},
{
    timestamps: true
})

export const Department = model<IDepartment>("Department", departmentSchema)
