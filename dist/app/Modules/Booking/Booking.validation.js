"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookingZodSchema = exports.BookingUpdateSchema = exports.CreateBookingZodSchema = exports.BookingSchema = exports.objectIdSchema = void 0;
const zod_1 = require("zod");
const Booking_interface_1 = require("./Booking.interface");
exports.objectIdSchema = zod_1.z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" });
exports.BookingSchema = zod_1.z.object({
    tour: zod_1.z.string(),
    guestCount: zod_1.z
        .number("guestCount must be a number")
        .int()
        .min(1, "guestCount must be at least 1"),
});
exports.CreateBookingZodSchema = exports.BookingSchema;
exports.BookingUpdateSchema = zod_1.z.object({
    status: zod_1.z
        .enum(Object.values(Booking_interface_1.BOOKING_STATUS))
        .optional(),
});
exports.UpdateBookingZodSchema = exports.BookingUpdateSchema;
//# sourceMappingURL=Booking.validation.js.map