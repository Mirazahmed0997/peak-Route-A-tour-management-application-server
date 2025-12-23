import { model, Schema } from "mongoose";
import { ITour, ITourType } from "./Tour.interface";




const TourTypeSchema = new Schema<ITourType>({
    name: {type: String,required: true, unique:true}
},
{
    timestamps: true
})

export const TourType = model<ITourType>("TourType", TourTypeSchema)

const tourSchema = new Schema<ITour>({
    title:{type:String, required:true},
    slug:{type:String, required:false, unique: true},
    description:{type:String},
    images: { type:[String],default:[]},
    location:{type:String,},
    costFrom:{type: Number},
    depurtureLocation:{type:String,required:false},
    arivalLocationl:{type:String,required:false},
    startDate: {type: Date},
    endDate:{type:Date},
    amenities: [{ type: String }],
    included: [{ type: String }],
    exCluded: [{ type: String }],
    tourPlan: [{ type: String }],
    maxGuest:{type: Number},
    minAge:{type: Number},
    division:{
        type: Schema.Types.ObjectId,
        ref :"Division",
        required: true
    },
    tourType:{
        type: Schema.Types.ObjectId,
        ref:"TourType",
        required: true
    }


},{
    timestamps: true
})



tourSchema.pre("save", async function (next){
    
    if(this.isModified("title")){
    const baseSlug = this.title.toLowerCase().split(" ").join("-")
    let slug = `${baseSlug}`
    let counter = 0
    while (await Tour.exists({ slug })) {
      slug = `${slug}-${counter++}`
    }
    this.slug = slug
  }
    

    next()
})


tourSchema.pre("findOneAndUpdate", async function (next){
    

  const tour= this.getUpdate() as Partial<ITour>

    if(tour.title){
    const baseSlug = tour.title.toLowerCase().split(" ").join("-")
    let slug = `${baseSlug}`

    let counter = 0
    while (await Tour.exists({ slug })) {
      slug = `${slug}-${counter++}`
    }
    tour.slug = slug
  }

  this.setUpdate(tour)
    

    next()
})


export const Tour= model<ITour>("Tour",tourSchema)