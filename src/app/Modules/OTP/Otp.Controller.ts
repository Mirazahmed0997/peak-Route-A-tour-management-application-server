import { Request, Response } from "express"
import { catchAsynch } from "../../Utils/CatchAsync"
import { sendResponse } from "../../Utils/sendResponse"
import { otpService } from "./Otp.Service"






const sentOtp = catchAsynch(async (req: Request, res: Response) => {

    console.log(req.body)

    const {email}=req.body

        await otpService.sendOTP(email)
   
       sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "OTP Succesfully sent",
        data: null,
    })
})
const verifyOtp = catchAsynch(async (req: Request, res: Response) => {

    const {email,otp}=req.body
        await otpService.veryfyOTP(email,otp)
       sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "OTP verfied Succesfully",
        data: null,
    })
})


export const OTPcontroller={
    sentOtp,
    verifyOtp
}