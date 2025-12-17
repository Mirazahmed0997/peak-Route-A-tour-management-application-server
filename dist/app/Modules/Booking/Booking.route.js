"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const CheckAuth_1 = require("../../middlewares/CheckAuth");
const User_interface_1 = require("../User/User.interface");
const validateRequest_1 = require("../../middlewares/validateRequest");
const Booking_controller_1 = require("./Booking.controller");
const Booking_validation_1 = require("./Booking.validation");
const router = (0, express_1.Router)();
router.post('/create', (0, CheckAuth_1.verifyAuth)(...Object.values(User_interface_1.Role)), (0, validateRequest_1.validateRequest)(Booking_validation_1.CreateBookingZodSchema), Booking_controller_1.BookingControllers.createBooking);
router.get('/', (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), Booking_controller_1.BookingControllers.getAllBookings);
router.get('/my-bookings', (0, CheckAuth_1.verifyAuth)(...Object.values(User_interface_1.Role)), Booking_controller_1.BookingControllers.getUserBooking);
router.get('/:id', (0, CheckAuth_1.verifyAuth)(...Object.values(User_interface_1.Role)), Booking_controller_1.BookingControllers.getSingleBookings);
router.patch('/:id', (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), (0, validateRequest_1.validateRequest)(Booking_validation_1.UpdateBookingZodSchema), Booking_controller_1.BookingControllers.updateBooking);
router.delete('/:id', (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), Booking_controller_1.BookingControllers.deleteBooking);
exports.BookingRoutes = router;
//# sourceMappingURL=Booking.route.js.map