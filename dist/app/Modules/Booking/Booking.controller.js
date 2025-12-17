"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingControllers = void 0;
const CatchAsync_1 = require("../../Utils/CatchAsync");
const sendResponse_1 = require("../../Utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const Booking_service_1 = require("./Booking.service");
const createBooking = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const decoddedToken = req.user;
    const booikings = await Booking_service_1.BookingService.createBooking(req.body, decoddedToken.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Bookings Create successfully",
        data: booikings,
    });
});
const getAllBookings = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const query = req.query;
    console.log(query);
    const bookings = await Booking_service_1.BookingService.getAllBookings(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Get all Bookings successfully",
        data: bookings,
    });
});
const getUserBooking = (0, CatchAsync_1.catchAsynch)(async (req, res) => {
    // const query = req.query
    const decoddedToken = req.user;
    const bookings = await Booking_service_1.BookingService.getUserBooking(decoddedToken.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Get all Bookings successfully",
        data: bookings,
    });
});
const getSingleBookings = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const id = req.params.id;
    // console.log(id)
    const bookings = await Booking_service_1.BookingService.getSingleBookings(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Get all Bookings successfully",
        data: bookings,
    });
});
const updateBooking = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    // ✅ call service with both id and payload
    const updateBooking = await Booking_service_1.BookingService.updateBooking(id, payload);
    // ✅ send proper response
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK, // use 200 for update
        message: "Booking updated successfully",
        data: updateBooking,
    });
});
const deleteBooking = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const { id } = req.params;
    const deleteBooking = await Booking_service_1.BookingService.deleteBooking(id);
    // ✅ send proper response
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK, // use 200 for update
        message: "Division deleted successfully",
        data: deleteBooking,
    });
});
exports.BookingControllers = {
    createBooking,
    getAllBookings,
    getUserBooking,
    getSingleBookings,
    updateBooking,
    deleteBooking,
};
//# sourceMappingURL=Booking.controller.js.map