import { NextFunction, Request, Response } from "express"
import { catchAsynch } from "../../Utils/CatchAsync"
import { sendResponse } from "../../Utils/sendResponse"
import httpStatus from "http-status-codes"
import { PaymentService } from "./Payment.secvice"
import { envVars } from "../../Config/env"
import { sslService } from "../SSLCommerce/sslCommerce.service"





const initPayment = catchAsynch(async (req: Request, res: Response) => {
    const bookingId = req.params.bookingId

    console.log("bookingId", bookingId)

    const result = await PaymentService.initPayment(bookingId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Payment Create successfully",
        data: result,
    })
})



const successPayment = catchAsynch(async (req: Request, res: Response) => {
    const query = req.query
    const result = await PaymentService.successPayment(query as Record<string, string>)

    if (result.success) {
        res.redirect(`${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    }
})


const getInvoiceDownloadUrl = catchAsynch(async (req: Request, res: Response) => {

    const { paymentId } = req.params
    const result = await PaymentService.getInvoiceDownloadUrl(paymentId as string)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Invoice Download URL retrived succesfully",
        data: result,
    });
}
);
const validatePayment = catchAsynch(async (req: Request, res: Response) => {

    const result = await sslService.validatePayment(req.body)

    console.log("ssl body",req.body)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Payment validated succesfully",
        data: result,
    });
}
);



const failPayment = catchAsynch(async (req: Request, res: Response) => {

    const query = req.query

    const result = await PaymentService.failPayment(query as Record<string, string>)

    console.log("failed", result)

    if (!result.success) {
        res.redirect(`${envVars.SSL.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    }

})



const cancelPayment = catchAsynch(async (req: Request, res: Response) => {

    const query = req.query
    const result = await PaymentService.cancelPayment(query as Record<string, string>)

    if (!result.success) {
        res.redirect(`${envVars.SSL.SSL_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    }
})






export const PaymentController = {
    successPayment,
    failPayment,
    cancelPayment,
    initPayment,
    getInvoiceDownloadUrl,
    validatePayment
}