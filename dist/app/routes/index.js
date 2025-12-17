"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const User_route_1 = require("../Modules/User/User.route");
const auth_route_1 = require("../Modules/Auth/auth.route");
const Division_route_1 = require("../Modules/Division/Division.route");
const Tour_route_1 = require("../Modules/Tour/Tour.route");
const TourModel_route_1 = require("../Modules/Tour/TourModel.route");
const Booking_route_1 = require("../Modules/Booking/Booking.route");
const Payment_route_1 = require("../Modules/Payment/Payment.route");
const Otp_Route_1 = require("../Modules/OTP/Otp.Route");
const Stats_route_1 = require("../Modules/Stats/Stats.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: User_route_1.userRoutes
    },
    {
        path: '/auth',
        route: auth_route_1.authRoutes
    },
    {
        path: '/division',
        route: Division_route_1.divisionRoutes
    },
    {
        path: '/TourType',
        route: Tour_route_1.TourTypeRoute
    },
    {
        path: '/Tour',
        route: TourModel_route_1.TourRoute
    },
    {
        path: '/Booking',
        route: Booking_route_1.BookingRoutes
    },
    {
        path: '/Payment',
        route: Payment_route_1.PaymentRoute
    },
    {
        path: '/Otp',
        route: Otp_Route_1.otpRouter
    },
    {
        path: '/Stats',
        route: Stats_route_1.statsRouter
    }
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
//# sourceMappingURL=index.js.map