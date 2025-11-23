
import { Types } from "mongoose";


export enum BOOKING_STATUS{
    PENDING= 'PENDING',
    CANCEL= "CANCEL",
    COMPLETE= "COMPLETE",
    FAILED="FAILED"
}

export interface Ibooking{
    user: Types.ObjectId,
    tour:Types.ObjectId,
    payment: Types.ObjectId,
    guesteCount: number;
    status: BOOKING_STATUS
}