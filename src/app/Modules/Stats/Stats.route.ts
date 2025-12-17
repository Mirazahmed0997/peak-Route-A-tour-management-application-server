import { Router } from "express";
import { verifyAuth } from "../../middlewares/CheckAuth";
import { Role } from "../User/User.interface";
import { StatsController } from "./StatsController";



const router= Router()


router.get('/bookingStat',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),StatsController.getBookingStats)
router.get('/paymentStat',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),StatsController.getPaymentStats)
router.get('/userStat',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),StatsController.getUserStat)
// router.get('/userStat',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),StatsController.getUserStat)
router.get('/tourStat',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),StatsController.getTourStat)


export const statsRouter=  router