

import { z } from "zod";
import { BOOKING_STATUS } from "./Booking.interface";


export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" });

export const BookingSchema = z.object({
  user: objectIdSchema,
  tour: objectIdSchema,
  payment: objectIdSchema,
  status: z
    .enum(Object.values(BOOKING_STATUS) as [string, ...string[]])
    .optional(),
  guestCount: z
    .number( "guestCount must be a number" )
    .int()
    .min(1, "guestCount must be at least 1"),
});

export const CreateBookingSchema = BookingSchema;


export type BookingInput = z.infer<typeof CreateBookingSchema>;
