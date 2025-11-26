

import { Router } from "express";
import { verifyAuth } from "../../middlewares/CheckAuth";
import { Role } from "../User/User.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { PaymentController } from "./Payment.controller";



const router =Router()

router.post('/create',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),
// validateRequest(CreateBookingZodSchema),
PaymentController.createPayment)
router.get('/',PaymentController.getAllPayments)
router.get('/:id',PaymentController.getSinglePAyments)

// router.patch('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),
// // validateRequest(UpdateBookingZodSchema),
// PaymentController.updateBooking)


router.delete('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),PaymentController.deletePayment)


export const PaymentRoute= router
