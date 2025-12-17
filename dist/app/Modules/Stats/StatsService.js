"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const Booking_model_1 = require("../Booking/Booking.model");
const Payment_interface_1 = require("../Payment/Payment.interface");
const Payment_model_1 = require("../Payment/Payment.model");
const Tour_model_1 = require("../Tour/Tour.model");
const User_interface_1 = require("../User/User.interface");
const User_model_1 = require("../User/User.model");
const now = new Date();
const sevenDaysAgo = new Date(now).setDate(now.getDate() - 7);
const thirtyDaysAgo = new Date(now).setDate(now.getDate() - 30);
const getUserStat = async () => {
    const totalUsersPromise = User_model_1.User.countDocuments();
    const totalActiveUSerPromise = User_model_1.User.countDocuments({ isActive: User_interface_1.isActive.ACTIVE });
    const totalInActiveUSerPromise = User_model_1.User.countDocuments({ isActive: User_interface_1.isActive.INACTIVE });
    const totalBlockUSerPromise = User_model_1.User.countDocuments({ isActive: User_interface_1.isActive.BLOCKED });
    const newUSersInLAstSevenDaysPromise = User_model_1.User.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
    });
    const newUSersInLAstThirtyDaysPromise = User_model_1.User.countDocuments({
        createdAt: { $gte: thirtyDaysAgo }
    });
    const usersByRolePromise = User_model_1.User.aggregate([
        {
            $group: {
                _id: "$role",
                count: { $sum: 1 }
            }
        }
    ]);
    const [totalUsers, totalActiveUsers, totalInActiveUSer, totalBlockUSer, newUSersInLAstSevenDays, newUSersInLAstThirtyDays, usersByRole] = await Promise.all([
        totalUsersPromise,
        totalActiveUSerPromise,
        totalInActiveUSerPromise,
        totalBlockUSerPromise,
        newUSersInLAstSevenDaysPromise,
        newUSersInLAstThirtyDaysPromise,
        usersByRolePromise
    ]);
    return {
        totalUsers,
        totalActiveUsers,
        totalInActiveUSer,
        totalBlockUSer,
        newUSersInLAstSevenDays,
        newUSersInLAstThirtyDays,
        usersByRole
    };
};
const getTourStat = async () => {
    const totalTourPromise = Tour_model_1.Tour.countDocuments();
    // await Tour.updateMany(
    //   {
    //     $or: [
    //       { tourType: { $type: "string" } },
    //       { division: { $type: "string" } }
    //     ]
    //   },
    //   [
    //     {
    //       $set: {
    //         tourType: {
    //           $cond: [
    //             { $eq: [{ $type: "$tourType" }, "string"] },
    //             { $toObjectId: "$tourType" },
    //             "$tourType"
    //           ]
    //         },
    //         division: {
    //           $cond: [
    //             { $eq: [{ $type: "$division" }, "string"] },
    //             { $toObjectId: "$division" },
    //             "$division"
    //           ]
    //         }
    //       }
    //     }
    //   ]
    // );
    const totalTourByTourTypePromise = Tour_model_1.Tour.aggregate([
        {
            $lookup: {
                from: "tourtypes",
                localField: "tourType",
                foreignField: "_id",
                as: "type"
            }
        },
        {
            $unwind: "$type"
        },
        {
            $group: {
                _id: "$type.name",
                count: { $sum: 1 }
            }
        }
    ]);
    const avgTourCostPromise = Tour_model_1.Tour.aggregate([
        {
            $group: {
                _id: null,
                avgCostFrom: { $avg: "$costFrom" }
            }
        }
    ]);
    const totalTourByDivisionPromise = Tour_model_1.Tour.aggregate([
        {
            $lookup: {
                from: "divisions",
                localField: "division",
                foreignField: "_id",
                as: "division"
            }
        },
        {
            $unwind: "$division"
        },
        {
            $group: {
                _id: "$area.slug",
                count: { $sum: 1 }
            }
        }
    ]);
    const totalHighestBookedTourPromise = Booking_model_1.Booking.aggregate([
        {
            $group: {
                _id: "$tour",
                bookingCount: { $sum: 1 }
            }
        },
        {
            $sort: { bookingCount: -1 }
        },
        {
            $limit: 5
        },
        {
            $lookup: {
                from: "tours",
                let: { tourId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$_id", "$$tourId"] }
                        }
                    }
                ],
                as: "tour"
            }
        },
        {
            $unwind: "$tour"
        },
        {
            $project: {
                bookingCount: 1,
                "tour.title": 1,
                "tour.slug": 1,
            }
        }
    ]);
    const [totalTour, totalTourByTourType, avgTourCost, totalTourByDivision, totalHighestBookedTour] = await Promise.all([totalTourPromise, totalTourByTourTypePromise, avgTourCostPromise, totalTourByDivisionPromise, totalHighestBookedTourPromise]);
    return {
        totalTour,
        totalTourByTourType,
        avgTourCost,
        totalTourByDivision,
        totalHighestBookedTour
    };
};
const getBookingStats = async () => {
    const totalBookingCountPromise = Booking_model_1.Booking.countDocuments();
    const totalBookingByStatusPromise = Booking_model_1.Booking.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);
    const bookingsPerTourPromise = Booking_model_1.Booking.aggregate([
        {
            $group: {
                _id: "$tour",
                bookingCount: { $sum: 1 }
            }
        },
        {
            $sort: { bookingCount: -1 }
        },
        {
            $limit: 10
        },
        {
            $lookup: {
                from: "tours",
                localField: "_id",
                foreignField: "_id",
                as: "tour"
            }
        },
        {
            $unwind: "$tour"
        },
        {
            $project: {
                _id: 1,
                bookingCount: 1,
                "tour.title": 1,
                "tour.slug": 1,
            }
        }
    ]);
    const avgGuestCountPerBookingPromise = Booking_model_1.Booking.aggregate([
        {
            $group: {
                _id: null,
                avgGuestCount: { $avg: "$guestCount" }
            }
        }
    ]);
    const bookingLastSevenDaysPromise = Booking_model_1.Booking.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
    });
    const bookingLastThirtyDaysPromise = Booking_model_1.Booking.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
    });
    const totalBookingForSingleUsersPromise = Booking_model_1.Booking.distinct("user").then((user) => user.length);
    const [totalBookingCount, totalBookingByStatus, bookingsPerTour, avgGuestCountPerBooking, bookingLastSevenDays, bookingLastThirtyDays, totalBookingForSingleUsers] = await Promise.all([totalBookingCountPromise, totalBookingByStatusPromise, bookingsPerTourPromise, avgGuestCountPerBookingPromise, bookingLastSevenDaysPromise, bookingLastThirtyDaysPromise, totalBookingForSingleUsersPromise]);
    return {
        totalBookingCount,
        totalBookingByStatus,
        bookingsPerTour,
        avgGuestCountPerBooking,
        bookingLastSevenDays,
        bookingLastThirtyDays,
        totalBookingForSingleUsers
    };
};
const getPaymentStats = async () => {
    const totalPaymentPromise = Payment_model_1.Payment.countDocuments();
    const totalRevenueByStatusPromise = Payment_model_1.Payment.aggregate([
        {
            $match: { status: Payment_interface_1.PAYMENT_STATUS.PAID }
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$amount" }
            }
        }
    ]);
    const totalPaymentByStatusPromise = Payment_model_1.Payment.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);
    const avgPaymentPromise = Payment_model_1.Payment.aggregate([
        {
            $group: {
                _id: null,
                avgCostFrom: { $avg: "$amount" }
            }
        }
    ]);
    const paymentGetwayDataPromise = Payment_model_1.Payment.aggregate([
        {
            $group: {
                _id: { $ifNull: ["$paymentGatewayData.status", "UNKNOWN"] },
                count: { $sum: 1 }
            }
        }
    ]);
    const [totalPayment, totalRevenueByStatus, totalPaymentByStatus, avgPayment, paymentGetwayData] = await Promise.all([totalPaymentPromise, totalRevenueByStatusPromise, totalPaymentByStatusPromise, avgPaymentPromise, paymentGetwayDataPromise]);
    return {
        totalPayment,
        totalRevenueByStatus,
        totalPaymentByStatus,
        avgPayment,
        paymentGetwayData
    };
};
exports.StatsService = {
    getBookingStats,
    getUserStat,
    getTourStat,
    getPaymentStats
};
//# sourceMappingURL=StatsService.js.map