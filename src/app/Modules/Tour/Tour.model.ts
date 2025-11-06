import { model, Schema } from "mongoose";
import { ITour, ITourType } from "./Tour.interface";
import { Division } from "../Division/Division.model";


const TourTypeSchema = new Schema<ITourType>({
    name: {type: String,required: true, unique:true}
},
{
    timestamps: true
})

const TourType = model<ITourType>("TourType", TourTypeSchema)

const tourSchema = new Schema<ITour>({
    title:{type:String, required:true},
    slug:{type: String, required:true, unique: true},
    description: {type: String},
    images: {type: [String], default: []},
    location: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    included:{type: [String],default:[]},
    exCluded:{type: [String],default:[]},
    amenities:{type: [String],default:[]},
    tourPlan: {type: [String],default:[]},
    maxGuest:{type:Number},
    minAge:{type:Number},
    division:{
        type: Schema.Types.ObjectId,
        ref: Division
    },

},{
    timestamps: true
})