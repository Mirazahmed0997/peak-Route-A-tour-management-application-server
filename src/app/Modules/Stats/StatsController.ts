import { NextFunction, Request, Response } from "express"
import { sendResponse } from "../../Utils/sendResponse"
import { StatsService } from "./StatsService"





const getBookingStats = async (req: Request, res: Response, nest: NextFunction) => {


    const bookingStats = await StatsService.getBookingStats()

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get Booking stats Successfully",
        data: bookingStats
    })
}
const getPaymentStats = async (req: Request, res: Response, nest: NextFunction) => {


    const paymentStats = await StatsService.getPaymentStats

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get Payment stats Successfully",
        data: getPaymentStats
    })
}
const getUserStat = async (req: Request, res: Response, nest: NextFunction) => {


    const userStat = await StatsService.getUserStat()

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get Users stats Successfully",
        data: userStat
    })
}
const getTourStat = async (req: Request, res: Response, nest: NextFunction) => {


    const tourStat = await StatsService.getTourStat()

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get Tours stats Successfully",
        data: tourStat
    })
}
// const getBookingStats = async (req: Request, res: Response, nest: NextFunction) => {


//     const bookingStats = await StatsService.getBookingStats

//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Get Booking stats Successfully",
//         data: bookingStats
//     })
// }









export const StatsController={
    getBookingStats,
    getPaymentStats,
    getUserStat,
    getTourStat
} 