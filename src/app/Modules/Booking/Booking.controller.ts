import { NextFunction, Request, Response } from "express"
import { catchAsynch } from "../../Utils/CatchAsync"
import { sendResponse } from "../../Utils/sendResponse"
import httpStatus from "http-status-codes"
import { string } from "zod"
import { BookingService } from "./Booking.service"





const createBooking = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    const booikings = await BookingService.createBooking(req.body, id as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Bookings Create successfully",
        data: booikings,
    })
})



const getAllBookings = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query
    console.log(query)
    const bookings = await BookingService.getAllBookings(query as Record<string, string>)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Get all Bookings successfully",
        data: bookings,
    })
})



const getSingleBookings = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {


    const id = req.params.id as string
    // console.log(id)
    const bookings = await BookingService.getSingleBookings(id)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Get all Bookings successfully",
        data: bookings,
    })
})


const updateBooking = catchAsynch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const payload = req.body;

        // ✅ call service with both id and payload
        const updateBooking = await BookingService.updateBooking(id as string, payload);

        // ✅ send proper response
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK, // use 200 for update
            message: "Booking updated successfully",
            data: updateBooking,
        });
    }
);

const deleteBooking = catchAsynch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const deleteBooking = await BookingService.deleteBooking(id as string);

        // ✅ send proper response
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK, // use 200 for update
            message: "Division deleted successfully",
            data: deleteBooking,
        });
    }
);




export const BookingControllers = {
    createBooking,
    getAllBookings,
    getSingleBookings,
    updateBooking,
    deleteBooking
}