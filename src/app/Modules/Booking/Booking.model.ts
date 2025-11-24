import { model, Schema } from "mongoose";
import { BOOKING_STATUS, Ibooking } from "./Booking.interface";


const bookingSchema= new Schema<Ibooking>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true},
    tour:{type: Schema.Types.ObjectId, ref:"Tour", required:true},
    payment:{type: Schema.Types.ObjectId, ref:"Payment", required:true},
    status:{type: String, enum: Object.values(BOOKING_STATUS), default:BOOKING_STATUS.PENDING},
    guestCount: {type: Number, required: true}
},
{
    timestamps: true
})


export const Booking =  model<Ibooking>("Booking",bookingSchema)