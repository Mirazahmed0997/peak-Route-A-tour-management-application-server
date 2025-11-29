

import { Router } from "express";
import { verifyAuth } from "../../middlewares/CheckAuth";
import { Role } from "../User/User.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { PaymentController } from "./Payment.controller";



const router =Router()

router.post('/success',PaymentController.successPayment)
router.get('/fail',)
router.get('/cancel',)



export const PaymentRoute= router
