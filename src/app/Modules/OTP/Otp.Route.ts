import express from "express"
import { OTPcontroller } from "./Otp.Controller";


const router= express.Router()

router.post('/send',OTPcontroller.sentOtp)
router.post('/verify',OTPcontroller.verifyOtp)

export const otpRouter= router; 

