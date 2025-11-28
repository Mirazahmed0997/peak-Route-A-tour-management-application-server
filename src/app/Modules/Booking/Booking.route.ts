

import { Router } from "express";
import { verifyAuth } from "../../middlewares/CheckAuth";
import { Role } from "../User/User.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { BookingControllers } from "./Booking.controller";
import { CreateBookingZodSchema, UpdateBookingZodSchema } from "./Booking.validation";



const router =Router()

router.post('/create',verifyAuth(...Object.values(Role)),
validateRequest(CreateBookingZodSchema),
BookingControllers.createBooking)


router.get('/',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),BookingControllers.getAllBookings)


router.get('/my-bookings',verifyAuth(...Object.values(Role)),BookingControllers.getUserBooking)


router.get('/:id',verifyAuth(...Object.values(Role)),BookingControllers.getSingleBookings)

router.patch('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),
validateRequest(UpdateBookingZodSchema),
BookingControllers.updateBooking)
router.delete('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),BookingControllers.deleteBooking)


export const BookingRoutes= router
