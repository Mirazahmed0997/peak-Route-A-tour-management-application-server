import { NextFunction, Request, Response } from "express"
import { catchAsynch } from "../../Utils/CatchAsync"
import { sendResponse } from "../../Utils/sendResponse"
import httpStatus from "http-status-codes"
import { string } from "zod"
import { BookingService } from "./Booking.service"
import { JwtPayload } from "jsonwebtoken"





const createBooking = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {

    const decoddedToken= req.user as JwtPayload

    const booikings = await BookingService.createBooking(req.body, decoddedToken.userId)
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


const getUserBooking = catchAsynch(async (req: Request, res: Response) => {
    // const query = req.query

    const decoddedToken= req.user as JwtPayload
    const bookings = await BookingService.getUserBooking(decoddedToken.userId)
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
    getUserBooking,
    getSingleBookings,
    updateBooking,
    deleteBooking,
}