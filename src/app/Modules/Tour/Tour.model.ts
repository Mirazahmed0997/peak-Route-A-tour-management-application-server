import { Schema } from "mongoose";
import { ITour } from "./Tour.interface";


const tourSchema = new Schema<ITour>({
    title:{type:String}
},{
    timestamps: true
})