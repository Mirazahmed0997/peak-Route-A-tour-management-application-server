

import { Router } from "express";
import { verifyAuth } from "../../middlewares/CheckAuth";
import { Role } from "../User/User.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { PaymentController } from "./Payment.controller";



const router =Router()


router.post('/init-payment/:bookingId',PaymentController.initPayment)
router.post('/success',PaymentController.successPayment)
router.post('/fail',PaymentController.failPayment)
router.post('/cancel',PaymentController.cancelPayment)
router.get('/invoice/:paymentId',verifyAuth(...Object.values(Role)),PaymentController.getInvoiceDownloadUrl)
router.post('/validate-payment',PaymentController.validatePayment)



export const PaymentRoute= router
