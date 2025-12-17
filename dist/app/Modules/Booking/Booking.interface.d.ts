import { Types } from "mongoose";
export declare enum BOOKING_STATUS {
    PENDING = "PENDING",
    CANCEL = "CANCEL",
    COMPLETE = "COMPLETE",
    FAILED = "FAILED"
}
export interface Ibooking {
    user: Types.ObjectId;
    tour: Types.ObjectId;
    payment: Types.ObjectId;
    guestCount: number;
    status: BOOKING_STATUS;
    createdAt?: Date;
}
//# sourceMappingURL=Booking.interface.d.ts.map