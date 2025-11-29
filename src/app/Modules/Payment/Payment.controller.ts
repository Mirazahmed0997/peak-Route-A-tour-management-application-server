import { NextFunction, Request, Response } from "express"
import { catchAsynch } from "../../Utils/CatchAsync"
import { sendResponse } from "../../Utils/sendResponse"
import httpStatus from "http-status-codes"
import { string } from "zod"
import { PaymentService } from "./Payment.secvice"
import { envVars } from "../../Config/env"





const successPayment = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
    const query= req.query
  const result= await PaymentService.successPayment(query as Record<string,string>)

  if(result.success)
  {
    res.redirect(envVars.SSL.SSL_SUCCESS_FRONTEND_URL)
  }
})



const failPayment = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
    
})



const cancelPayment = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {


})






export const PaymentController = {
    successPayment,
    failPayment,
    cancelPayment,
}