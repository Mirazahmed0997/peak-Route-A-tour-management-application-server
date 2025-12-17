import { isActive } from "../User/User.interface"
import { User } from "../User/User.model"



const now= new Date()

const sevenDaysAgo=new Date(now).setDate(now.getDate() -7)
const thirtyDaysAgo=new Date(now).setDate(now.getDate() -30)




const getUserStat=async()=>
{
    const totalUsersPromise=  User.countDocuments()
    
    const totalActiveUSerPromise=  User.countDocuments({isActive: isActive.ACTIVE})
    const totalInActiveUSerPromise=  User.countDocuments({isActive: isActive.INACTIVE})
    const totalBlockUSerPromise=  User.countDocuments({isActive: isActive.BLOCKED})

    const newUSersInLAstSevenDaysPromise= User.countDocuments({
        createdAt:{ $gte:sevenDaysAgo}
    })
    const newUSersInLAstThirtyDaysPromise= User.countDocuments({
        createdAt:{ $gte:thirtyDaysAgo}
    })


    const usersByRolePromise= User.aggregate([
        {
            $group:{
                _id:"$role",
                count:{$sum:1}
            }
        }
    ])

    const [totalUsers,totalActiveUsers,totalInActiveUSer,totalBlockUSer,newUSersInLAstSevenDays,newUSersInLAstThirtyDays,usersByRole]= await Promise.all([
        totalUsersPromise,
        totalActiveUSerPromise,
        totalInActiveUSerPromise,
        totalBlockUSerPromise,
        newUSersInLAstSevenDaysPromise,
        newUSersInLAstThirtyDaysPromise,
        usersByRolePromise
    ])
    
    return{
        totalUsers,
        totalActiveUsers,
        totalInActiveUSer,
        totalBlockUSer,
        newUSersInLAstSevenDays,
        newUSersInLAstThirtyDays,
        usersByRole
    }
}

const getTourStat=async()=>
{
    return{}
}

const getBookingStats=async()=>
{
    return{}
}
const getPaymentStats=async()=>
{
    return{}
}






export const StatsService={
    getBookingStats,
    getUserStat,
    getTourStat,
    getPaymentStats
}