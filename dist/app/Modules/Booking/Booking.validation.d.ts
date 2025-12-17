import { z } from "zod";
export declare const objectIdSchema: z.ZodString;
export declare const BookingSchema: z.ZodObject<{
    tour: z.ZodString;
    guestCount: z.ZodNumber;
}, z.core.$strip>;
export declare const CreateBookingZodSchema: z.ZodObject<{
    tour: z.ZodString;
    guestCount: z.ZodNumber;
}, z.core.$strip>;
export type BookingInput = z.infer<typeof CreateBookingZodSchema>;
export declare const BookingUpdateSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
}, z.core.$strip>;
export declare const UpdateBookingZodSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
}, z.core.$strip>;
export type BookingUpdateInput = z.infer<typeof UpdateBookingZodSchema>;
//# sourceMappingURL=Booking.validation.d.ts.map