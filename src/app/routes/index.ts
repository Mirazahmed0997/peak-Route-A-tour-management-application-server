import { Router } from "express";
import { userRoutes } from "../Modules/User/User.route";
import path from "path";
import { authRoutes } from "../Modules/Auth/auth.route";
import { divisionRoutes } from "../Modules/Division/Division.route";
import { TourTypeRoute } from "../Modules/Tour/Tour.route";
import { TourRoute } from "../Modules/Tour/TourModel.route";
import { BookingRoutes } from "../Modules/Booking/Booking.route";
import { PaymentRoute } from "../Modules/Payment/Payment.route";
import { otpRouter } from "../Modules/OTP/Otp.Route";
import { statsRouter } from "../Modules/Stats/Stats.route";


export const router= Router()

const moduleRoutes=[
    {
        path:'/user',
        route: userRoutes
    },
    {
        path:'/auth',
        route: authRoutes
    },
    {
        path:'/division',
        route: divisionRoutes
    },
    {
        path:'/TourType',
        route: TourTypeRoute
    },
    {
        path:'/Tour',
        route: TourRoute
    },
    {
        path:'/Booking',
        route: BookingRoutes
    },
    {
        path:'/Payment',
        route: PaymentRoute
    },
    {
        path:'/Otp',
        route: otpRouter
    },
    {
        path:'/Stats',
        route: statsRouter
    }
  
]

moduleRoutes.forEach((route)=>
{
    router.use(route.path,route.route)
})