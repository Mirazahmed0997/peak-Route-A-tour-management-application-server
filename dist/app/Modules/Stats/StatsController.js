"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsController = void 0;
const sendResponse_1 = require("../../Utils/sendResponse");
const StatsService_1 = require("./StatsService");
const getBookingStats = async (req, res, nest) => {
    const bookingStats = await StatsService_1.StatsService.getBookingStats();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Get Booking stats Successfully",
        data: bookingStats
    });
};
const getPaymentStats = async (req, res, nest) => {
    const paymentStats = await StatsService_1.StatsService.getPaymentStats();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Get Payment stats Successfully",
        data: paymentStats
    });
};
const getUserStat = async (req, res, nest) => {
    const userStat = await StatsService_1.StatsService.getUserStat();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Get Users stats Successfully",
        data: userStat
    });
};
const getTourStat = async (req, res, nest) => {
    const tourStat = await StatsService_1.StatsService.getTourStat();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Get Tours stats Successfully",
        data: tourStat
    });
};
// const getBookingStats = async (req: Request, res: Response, nest: NextFunction) => {
//     const bookingStats = await StatsService.getBookingStats
//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Get Booking stats Successfully",
//         data: bookingStats
//     })
// }
exports.StatsController = {
    getBookingStats,
    getPaymentStats,
    getUserStat,
    getTourStat
};
//# sourceMappingURL=StatsController.js.map