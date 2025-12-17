import { Booking } from "../Booking/Booking.model"
import { Tour, TourType } from "../Tour/Tour.model"
import { isActive } from "../User/User.interface"
import { User } from "../User/User.model"



const now = new Date()

const sevenDaysAgo = new Date(now).setDate(now.getDate() - 7)
const thirtyDaysAgo = new Date(now).setDate(now.getDate() - 30)




const getUserStat = async () => {
    const totalUsersPromise = User.countDocuments()

    const totalActiveUSerPromise = User.countDocuments({ isActive: isActive.ACTIVE })
    const totalInActiveUSerPromise = User.countDocuments({ isActive: isActive.INACTIVE })
    const totalBlockUSerPromise = User.countDocuments({ isActive: isActive.BLOCKED })

    const newUSersInLAstSevenDaysPromise = User.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
    })
    const newUSersInLAstThirtyDaysPromise = User.countDocuments({
        createdAt: { $gte: thirtyDaysAgo }
    })


    const usersByRolePromise = User.aggregate([
        {
            $group: {
                _id: "$role",
                count: { $sum: 1 }
            }
        }
    ])

    const [totalUsers, totalActiveUsers, totalInActiveUSer, totalBlockUSer, newUSersInLAstSevenDays, newUSersInLAstThirtyDays, usersByRole] = await Promise.all([
        totalUsersPromise,
        totalActiveUSerPromise,
        totalInActiveUSerPromise,
        totalBlockUSerPromise,
        newUSersInLAstSevenDaysPromise,
        newUSersInLAstThirtyDaysPromise,
        usersByRolePromise
    ])

    return {
        totalUsers,
        totalActiveUsers,
        totalInActiveUSer,
        totalBlockUSer,
        newUSersInLAstSevenDays,
        newUSersInLAstThirtyDays,
        usersByRole
    }
}



const getTourStat = async () => {
    const totalTourPromise = Tour.countDocuments()

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




   const totalTourByTourTypePromise = Tour.aggregate([
    {
      $lookup: {
        from: "tourtypes",
        localField: "tourType",
        foreignField: "_id",
        as: "type"
      }
    },
    {
        $unwind:"$type"
    },
    {
        $group:{
            _id:"$type.name",
            count: {$sum:1}
        }
    }
  ]);

  const avgTourCostPromise= Tour.aggregate([
    {
        $group:{
            _id:null,
            avgCostFrom:{$avg: "$costFrom"}
        }
    }
  ])

  const totalTourByDivisionPromise= Tour.aggregate([
     {
      $lookup: {
        from: "divisions",
        localField: "division",
        foreignField: "_id",
        as: "division"
      }
    },
    {
        $unwind:"$division"
    },
    {
        $group:{
            _id:"$area.slug",
            count: {$sum:1}
        }
    }
  ])


  const totalHighestBookedTourPromise=Booking.aggregate([
    {
        $group:{
            _id:"$tour",
            bookingCount:{$sum:1}
        }
    },
    {
        $sort:{bookingCount: -1}
    },
    {
        $limit:5
    },
     {
      $lookup: {
        from: "tours",
        let: {tourId:"$_id"},
        pipeline:[
            {
                $match:{
                    $expr:{$eq:["$_id", "$$tourId"]}
                }
            }
        ],
        as:"tour"
      }
    },
    {
        $unwind:"$tour"
    },
    {
        $project:{
            bookingCount:1,
            "tour.title":1,
            "tour.slug":1,

        }
    }
  ])

    const [totalTour, totalTourByTourType,avgTourCost,totalTourByDivision,totalHighestBookedTour] = await Promise.all([totalTourPromise, totalTourByTourTypePromise,avgTourCostPromise,totalTourByDivisionPromise,totalHighestBookedTourPromise])


    return {
        totalTour,
        totalTourByTourType,
        avgTourCost,
        totalTourByDivision,
        totalHighestBookedTour
    }
}

const getBookingStats = async () => {
    return {}
}
const getPaymentStats = async () => {
    return {}
}






export const StatsService = {
    getBookingStats,
    getUserStat,
    getTourStat,
    getPaymentStats
}