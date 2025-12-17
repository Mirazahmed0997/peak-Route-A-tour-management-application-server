import { Ibooking } from "./Booking.interface";
export declare const BookingService: {
    createBooking: (payload: Partial<Ibooking>, userId: string) => Promise<{
        booking: (import("mongoose").Document<unknown, {}, Ibooking, {}, {}> & Ibooking & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
        paymentUrl: any;
    }>;
    getAllBookings: (query: Record<string, string>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, Ibooking, {}, {}> & Ibooking & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        meta: {
            page: number;
            limit: number;
            totalPage: number;
            total: number;
        };
    }>;
    getUserBooking: (userId: string) => Promise<{
        data: (import("mongoose").Document<unknown, {}, Ibooking, {}, {}> & Ibooking & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    getSingleBookings: (id: string) => Promise<{
        data: (import("mongoose").Document<unknown, {}, Ibooking, {}, {}> & Ibooking & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    updateBooking: (id: string, payload: Partial<Ibooking>) => Promise<(import("mongoose").Document<unknown, {}, Ibooking, {}, {}> & Ibooking & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteBooking: (id: string) => Promise<(import("mongoose").Document<unknown, {}, Ibooking, {}, {}> & Ibooking & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=Booking.service.d.ts.map