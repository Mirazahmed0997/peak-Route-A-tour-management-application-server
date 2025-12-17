"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const QueryBuilder_1 = require("../../Utils/QueryBuilder");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const Booking_interface_1 = require("./Booking.interface");
const Booking_model_1 = require("./Booking.model");
const Booking_Constant_1 = require("./Booking.Constant");
const User_model_1 = require("../User/User.model");
const Payment_interface_1 = require("../Payment/Payment.interface");
const Payment_model_1 = require("../Payment/Payment.model");
const Tour_model_1 = require("../Tour/Tour.model");
const sslCommerce_service_1 = require("../SSLCommerce/sslCommerce.service");
const getTransactionId_1 = require("../../Utils/getTransactionId");
const createBooking = async (payload, userId) => {
    const id = userId;
    const tranSactionId = (0, getTransactionId_1.getTransactionId)();
    const session = await Booking_model_1.Booking.startSession();
    session.startTransaction();
    try {
        const user = await User_model_1.User.findById(id);
        if (!user?.phone || !user?.address) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Please Update your Profile to book tour");
        }
        const tour = await Tour_model_1.Tour.findById(payload.tour).select("costFrom");
        if (!tour?.costFrom) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, " NO tour cost not found");
        }
        const amount = Number(tour.costFrom) * Number(payload.guestCount);
        const booking = await Booking_model_1.Booking.create([{
                user: userId,
                status: Booking_interface_1.BOOKING_STATUS.PENDING,
                ...payload,
            }], { session });
        const payment = await Payment_model_1.Payment.create([{
                booking: booking[0]?._id,
                status: Payment_interface_1.PAYMENT_STATUS.UNPAID,
                transactionId: tranSactionId,
                amount: amount
            }], { session });
        const updatedBooking = await Booking_model_1.Booking
            .findByIdAndUpdate(booking[0]?._id, { payment: payment[0]?._id }, { new: true, runValidators: true, session })
            .populate("user", "name email phone address")
            .populate("tour", "title costFrom")
            .populate("payment");
        const userAddress = (updatedBooking?.user).address;
        const userEmail = (updatedBooking?.user).email;
        const userPhoneNumber = (updatedBooking?.user).phone;
        const userName = (updatedBooking?.user).name;
        const sslPayload = {
            address: userAddress,
            email: userEmail,
            phoneNumber: userPhoneNumber,
            name: userName,
            amount: amount,
            transactionId: tranSactionId
        };
        const sslPayment = await sslCommerce_service_1.sslService.sslPaymentInit(sslPayload);
        await session.commitTransaction();
        session.endSession();
        return {
            booking: updatedBooking,
            paymentUrl: sslPayment.GatewayPageURL
        };
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const getAllBookings = async (query) => {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(Booking_model_1.Booking.find(), query);
    const bookings = await queryBuilder
        .search(Booking_Constant_1.searchFields)
        .filter()
        .fields()
        .paginate()
        .sort();
    const [data, meta] = await Promise.all([
        bookings.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
};
const getSingleBookings = async (id) => {
    console.log("booking Id", id);
    const booking = await Booking_model_1.Booking.findById(id);
    return {
        data: booking,
    };
};
const getUserBooking = async (userId) => {
    const booking = await Booking_model_1.Booking.find({ user: userId });
    return {
        data: booking,
    };
};
const updateBooking = async (id, payload) => {
    const isExist = await Booking_model_1.Booking.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Booking not found");
    }
    const updatedBookings = await Booking_model_1.Booking.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updatedBookings;
};
const deleteBooking = async (id) => {
    const isExist = await Booking_model_1.Booking.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Booking not found");
    }
    const deletedBooking = await Booking_model_1.Booking.findByIdAndDelete(id);
    return deletedBooking;
};
exports.BookingService = {
    createBooking,
    getAllBookings,
    getUserBooking,
    getSingleBookings,
    updateBooking,
    deleteBooking
};
//# sourceMappingURL=Booking.service.js.map