import { NextFunction, Request, Response } from "express"
import { catchAsynch } from "../../Utils/CatchAsync"
import { sendResponse } from "../../Utils/sendResponse"
import httpStatus from "http-status-codes"
import { string } from "zod"
import { PaymentService } from "./Payment.secvice"





const createPayment = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    const booikings = await PaymentService.createPayment(req.body, id as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Payment Create successfully",
        data: booikings,
    })
})



const getAllPayments = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query
    console.log(query)
    const bookings = await PaymentService.getAllPayments(query as Record<string, string>)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Get all Payments successfully",
        data: bookings,
    })
})



const getSinglePAyments = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {


    const id = req.params.id as string
    console.log(id)
    const bookings = await PaymentService.getSinglePayments(id)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Get all Payments successfully",
        data: bookings,
    })
})


// const updateBooking = catchAsynch(
//     async (req: Request, res: Response, next: NextFunction) => {
//         const { id } = req.params;
//         const payload = req.body;

//         const updateBooking = await PaymentService.updateBooking(id as string, payload);

//         sendResponse(res, {
//             success: true,
//             statusCode: httpStatus.OK, // use 200 for update
//             message: "Booking updated successfully",
//             data: updateBooking,
//         });
//     }
// );

const deletePayment = catchAsynch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const deleteBooking = await PaymentService.deletePayment(id as string);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK, // use 200 for update
            message: "Payment deleted successfully",
            data: deleteBooking,
        });
    }
);




export const PaymentController = {
    createPayment,
    getAllPayments,
    getSinglePAyments,
    deletePayment
}