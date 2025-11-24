

import { Router } from "express";
import { verifyAuth } from "../../middlewares/CheckAuth";
import { Role } from "../User/User.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { BookingControllers } from "./Booking.controller";



const router =Router()

router.post('/create',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),
// validateRequest(createDivisionZodSchema),
BookingControllers.createBooking)
router.get('/',BookingControllers.getAllBookings)
router.get('/:id',BookingControllers.getSingleBookings)

router.patch('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),
// validateRequest(updateDivisionZodSchema),
BookingControllers.updateBooking)
router.delete('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),BookingControllers.deleteBooking)


export const divisionRoutes= router