

import { z } from "zod";
import { BOOKING_STATUS } from "./Booking.interface";


export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" });

export const BookingSchema = z.object({
  tour: z.string(),
  guestCount: z
    .number( "guestCount must be a number" )
    .int()
    .min(1, "guestCount must be at least 1"),
});

export const CreateBookingZodSchema = BookingSchema;


export type BookingInput = z.infer<typeof CreateBookingZodSchema>;





export const BookingUpdateSchema = z.object({

  status: z
    .enum(Object.values(BOOKING_STATUS) as [string, ...string[]])
    .optional(),
});

export const UpdateBookingZodSchema = BookingUpdateSchema;


export type BookingUpdateInput = z.infer<typeof UpdateBookingZodSchema>;
